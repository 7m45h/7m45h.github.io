+++
title = 'sugar crystals'
description = "list of actress I like"
tags = ["actress", "list"]
date = 2024-04-27
draft = false
repo = "url"
[[powerdby]]
name = "name"
link = "url"
+++

{{< sugarlister.inline >}}
  {{ range .Site.Data.sugar_crystals.crystal }}
    {{ partial "anchor_card.html" (dict "url" .url "name" .name "ext" true) }}
  {{ end }}
{{</ sugarlister.inline >}}
