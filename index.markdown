---
layout: main
---


{% for year in (1..3) %}
<div class="panel panel-default">
  <div class="panel-heading">Year {{ year }}</div>
  <div class="panel-body">
    {% for module in site.data.modules %}
        {% if module.year == year %}
            {% if module.prerequisites == '' %}
                <div class="module-button {{ module.code }}">
                    <label>
                        <input
                            type="checkbox"
                            class="module-checkbox"
                            id="{{ module.code }}"
                            prerequisites="{{ module.prerequisites }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            onChange="update_counter(this, true)">
                        <span>{{ module.code }}</span>
                    </label>
                </div>
            {% else %}
                <div class="module-button {{ module.code }}">
                    <label>
                        <input
                            type="checkbox"
                            class="module-checkbox"
                            id="{{ module.code }}"
                            prerequisites="{{ module.prerequisites }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            onChange="update_counter(this, true)"
                            disabled>
                        <span>{{ module.code }}</span>
                    </label>
                </div>
            {% endif %}
        {% endif %}
    {% endfor %}
  </div>
  <div class="panel-footer" id="year-{{ year }}-counter">Credits Selected: 0</div>
</div>
{% endfor %}