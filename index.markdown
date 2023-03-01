---
layout: main
---

<h1 style="font-weight: bold;">Cardiff Mathematics Module Choosing Tool</h1>

<div class="select_degree">Select degree scheme...</div>

<div class="list-group">
    {% for degree in site.data.degrees %}
        <a href="/courses/{{ degree[0] }}/" class="list-group-item">
            <span style="font-weight: bold;">{{ degree[0] }}</span> - 
            <span style="font-style: italic;">{{ degree[1].title }}</span>
        </a>
    {% endfor %}
</div>