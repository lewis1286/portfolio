---
layout: page
title: Home
---


----------
# list of posts in `_posts` folder
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

## Projects:

- [Sierra's feeding habits](projects/sierra/feeding/index.html)
- [Sierra feeding Joy Division style](projects/sierra/jd/index.html)
<!-- - [Sierra's feeding habits sketchpad](projects/sierra/index.html) -->
