<?php

/*
 * This file is part of Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PreviewBundle\Tests\Unit\Preview\Renderer;

use Prophecy\Argument;
use Sulu\Bundle\PreviewBundle\Preview\Events;
use Sulu\Bundle\PreviewBundle\Preview\Renderer\PreviewRenderer;
use Sulu\Bundle\PreviewBundle\Preview\Renderer\PreviewRendererInterface;
use Sulu\Bundle\RouteBundle\Routing\Defaults\RouteDefaultsProviderInterface;
use Sulu\Component\Localization\Localization;
use Sulu\Component\Webspace\Manager\WebspaceManagerInterface;
use Sulu\Component\Webspace\Portal;
use Sulu\Component\Webspace\PortalInformation;
use Sulu\Component\Webspace\Webspace;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class PreviewRendererTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var RouteDefaultsProviderInterface
     */
    private $routeDefaultsProvider;

    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @var HttpKernelInterface
     */
    private $httpKernel;

    /**
     * @var WebspaceManagerInterface
     */
    private $webspaceManager;

    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * @var PreviewRendererInterface
     */
    private $renderer;

    /**
     * @var array
     */
    private $previewDefault = ['analyticsKey' => 'UA-xxxx'];

    /**
     * @var string
     */
    private $environment = 'prod';

    public function setUp()
    {
        $this->routeDefaultsProvider = $this->prophesize(RouteDefaultsProviderInterface::class);
        $this->requestStack = $this->prophesize(RequestStack::class);
        $this->httpKernel = $this->prophesize(HttpKernelInterface::class);
        $this->webspaceManager = $this->prophesize(WebspaceManagerInterface::class);
        $this->eventDispatcher = $this->prophesize(EventDispatcherInterface::class);

        $this->renderer = new PreviewRenderer(
            $this->routeDefaultsProvider->reveal(),
            $this->requestStack->reveal(),
            $this->httpKernel->reveal(),
            $this->webspaceManager->reveal(),
            $this->eventDispatcher->reveal(),
            $this->previewDefault,
            $this->environment
        );
    }

    public function testRender()
    {
        $object = $this->prophesize(\stdClass::class);

        $portalInformation = $this->prophesize(PortalInformation::class);
        $webspace = $this->prophesize(Webspace::class);
        $localization = new Localization('de');
        $webspace->getLocalization('de')->willReturn($localization);
        $portalInformation->getWebspace()->willReturn($webspace->reveal());
        $portalInformation->getPortal()->willReturn($this->prophesize(Portal::class)->reveal());
        $portalInformation->getUrl()->willReturn('sulu.lo');
        $portalInformation->getPrefix()->willReturn('/de');

        $this->webspaceManager->findPortalInformationsByWebspaceKeyAndLocale('sulu_io', 'de', $this->environment)
            ->willReturn([$portalInformation->reveal()]);

        $this->routeDefaultsProvider->supports(get_class($object->reveal()))->willReturn(true);
        $this->routeDefaultsProvider->getByEntity(get_class($object->reveal()), 1, $object)
            ->willReturn(['object' => $object, '_controller' => 'SuluTestBundle:Test:render']);

        $this->eventDispatcher->dispatch(Events::PRE_RENDER, Argument::type(Events\PreRenderEvent::class))
            ->shouldBeCalled();

        $this->httpKernel->handle(Argument::type(Request::class), HttpKernelInterface::SUB_REQUEST)
            ->shouldBeCalled()->willReturn(new Response('<title>Hallo</title>'));

        $request = new Request();
        $this->requestStack->getCurrentRequest()->willReturn($request);

        $response = $this->renderer->render($object->reveal(), 1, 'sulu_io', 'de', true);
        $this->assertEquals('<title>Hallo</title>', $response);
    }
}