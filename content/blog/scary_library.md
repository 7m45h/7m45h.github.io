+++
title = 'scary library'
description = "list of websites"
tags = ["website", "dir", "web dir"]
date = 2024-02-12
draft = true
[[powerdby]]
name = " scary librarian"
link = "https://gist.github.com/7m45h/9034d0d2deba4d090d4242f55aa97ef4"
+++

{{< scarylister.inline >}}
  {{ range .Site.Data.scary_library.site }}
    {{ partial "anchor_card.html" (dict "url" .url "name" .name "ext" true) }}
  {{ end }}
{{</ scarylister.inline >}}
