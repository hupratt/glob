import os
import re
import json

from bs4 import BeautifulSoup


from draftjs_exporter.constants import BLOCK_TYPES, ENTITY_TYPES, INLINE_STYLES
from draftjs_exporter.defaults import BLOCK_MAP, STYLE_MAP
from draftjs_exporter.html import HTML

from .decorators import (
    import_decorator,
    missing_inline,
    missing_block,
    icon,
    image,
    link,
    hr,
)

import markdown as md


def richtext_to_html(richtext):

    entity_decorators, block_map, style_map = {}, {}, {}

    entity_decorators[ENTITY_TYPES.FALLBACK] = missing_inline
    block_map[BLOCK_TYPES.FALLBACK] = missing_block
    style_map[INLINE_STYLES.FALLBACK] = missing_inline

    for type_, value in initialConfig.get("entity_decorators", {}).items():
        entity_decorators[type_] = value

    exporter = HTML(
        {
            "entity_decorators": entity_decorators,
            "block_map": block_map,
            "style_map": style_map,
        }
    )
    try:
        html = exporter.render(richtext)
    except AttributeError as e:
        html = md.markdown(richtext)
    except Exception as e:
        pass
    return html
    # return {"html": html, "markdown": markdown_html}


initialConfig = {
    "entity_decorators": {"LINK": "link", "IMAGE": "image", "HORIZONTAL_RULE": "hr"},
    "block_map": {
        "header-three": "h3",
        "header-four": "h4",
        "ordered-list-item": {"element": "li", "wrapper": "ol"},
        "unordered-list-item": {
            "element": "li",
            "wrapper": "ul",
            "wrapper_props": {"class": "bullet-list"},
        },
    },
    "style_map": {
        "BOLD": "strong",
        "ITALIC": {"element": "em", "props": {"class": "u-font-italic"}},
    },
}
