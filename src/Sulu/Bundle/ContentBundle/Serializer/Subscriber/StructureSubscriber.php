<?php

/*
 * This file is part of Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\ContentBundle\Serializer\Subscriber;

use JMS\Serializer\EventDispatcher\Events;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use JMS\Serializer\EventDispatcher\PreSerializeEvent;
use Sulu\Bundle\DocumentManagerBundle\Bridge\DocumentInspector;
use Sulu\Component\Content\Document\Behavior\StructureBehavior;
use Sulu\Component\Content\Document\Structure\Structure;
use Sulu\Component\Content\Metadata\StructureMetadata;
use Sulu\Component\DocumentManager\Behavior\Mapping\UuidBehavior;

/**
 * Normalize ManagedStructure instances to the Structure type.
 */
class StructureSubscriber implements EventSubscriberInterface
{
    /**
     * @var DocumentInspector
     */
    private $inspector;

    public function __construct(DocumentInspector $inspector)
    {
        $this->inspector = $inspector;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => Events::PRE_SERIALIZE,
                'method' => 'onPreSerialize',
            ],
            [
                'event' => Events::POST_SERIALIZE,
                'format' => 'json',
                'method' => 'onPostSerialize',
            ],
        ];
    }

    /**
     * @param PreSerializeEvent $event
     */
    public function onPreSerialize(PreSerializeEvent $event)
    {
        if ($event->getObject() instanceof Structure) {
            $event->setType(Structure::class);
        }
    }

    public function onPostSerialize(ObjectEvent $event)
    {
        $document = $event->getObject();
        $context = $event->getContext();

        if (!$document instanceof StructureBehavior) {
            return;
        }

        $visitor = $event->getVisitor();

        $visitor->addData('template', $document->getStructureType());
        $visitor->addData('originTemplate', $document->getStructureType());
        $visitor->addData('internal', false);

        if (array_search('defaultPage', $context->attributes->get('groups')->getOrElse([])) !== false) {
            $structure = $document->getStructure();
            // TODO get the structure metadata in a better, documented way
            /** @var StructureMetadata $structureMetadata */
            $structureMetadata = $structure->getStructureMetadata();
            foreach ($structure->toArray() as $name => $value) {
                if ($name === 'title') {
                    continue;
                }

                if ($structureMetadata->getProperty($name)->hasTag('sulu.rlp')) {
                    continue;
                }

                $visitor->addData($name, $value);
            }
        }

        // create bread crumbs
        if (array_search('breadcrumbPage', $context->attributes->get('groups')->getOrElse([])) !== false) {
            $items = [];
            $parentDocument = $this->inspector->getParent($document);
            while ($parentDocument instanceof StructureBehavior) {
                $item = [];
                if ($parentDocument instanceof UuidBehavior) {
                    $item['uuid'] = $parentDocument->getUuid();
                }

                $item['title'] = $parentDocument->getStructure()->getProperty('title')->getValue();

                $items[] = $item;

                $parentDocument = $this->inspector->getParent($parentDocument);
            }

            $items = array_reverse($items);

            array_walk($items, function (&$item, $index) {
                $item['depth'] = $index;
            });

            $visitor->addData('breadcrumb', $items);
        }
    }
}
