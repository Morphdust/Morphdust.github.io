---
layout: archive
title: "Repair Log"
permalink: /repair/
author_profile: true
---

Here is the repair log for my volunteering sessions at the [Sparks Repair Cafe](https://www.instagram.com/sparks_repairium/).
The motivation for this is partly that I enjoy helping people out and fixing things, but also the concern of the amount of e-waste that modern society is ending up with.
Often these items are not designed to be fixed or even modified to work in a different way. The amount of plastic, chemicals, metals and rare earth metals that just end up in landfill is a distressing thought. 

Here I hope to post the repairs and attempted repairs that I work on at the repair cafe, so that if somebody happens to stumble onto them it may help them on their journey to fix their own devices.


{% include base_path %}

{% for post in site.repair reversed %}
  {% include archive-repair-list.html %}
{% endfor %}

