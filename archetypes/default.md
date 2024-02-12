+++
title = '{{ replace .File.ContentBaseName "_" " " }}'
description = "description"
tags = ["tag", "on"]
date = {{ .Date | time.Format "2006-01-02" }}
draft = true
repo = "url"
[[powerdby]]
name = "name"
link = "url"
+++
