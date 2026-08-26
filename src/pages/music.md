---
layout: ../layouts/PageLayout.astro
title: "歌单"
description: "我喜欢的音乐"
--- 

{% media audio %}
- title: 网易云
  list:
    - https://music.163.com/#/playlist?id=7637708943
- title: 古风
  list:
    - https://music.163.com/#/playlist?id=8395748130
{% endmedia %}
