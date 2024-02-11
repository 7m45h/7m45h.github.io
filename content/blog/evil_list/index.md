+++
title = 'evil list'
description = "list of movies i enjoyed watching"
tags = ["7m45h", "movies", "list"]
date = 2024-02-11T16:21:09+05:30
draft = true
[[powerdby]]
name = "impawards"
link = "http://www.impawards.com/"
[[powerdby]]
name = "themoviedb"
link = "https://www.themoviedb.org/"
[[powerdby]]
name = "evil manager"
link = "https://github.com/7m45h/evil_manager"
+++

{{< evillister.inline >}}
  {{ range .Site.Data.movies.movies }}
    {{ $title := printf "%s %s" .name .year }}
    {{ $poster := printf "images/%s.*" .imdb }}
    <a class="m-poster" href="https://www.imdb.com/title/{{ .imdb }}/" title="{{ $title }}" target="_blank">
      {{ with page.Resources.GetMatch $poster }}
        <img src="{{ .Permalink }}" alt="{{ $title }}" loading="lazy">
      {{ end }}
    </a>
  {{ end }}
{{</ evillister.inline >}}