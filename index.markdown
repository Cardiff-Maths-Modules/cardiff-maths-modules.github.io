---
layout: main
---


{% for year in (1..3) %}
<div style="display: flex;">
<div class="panel panel-default panel-left">
  <div class="panel-heading">Year {{ year }}</div>
  <div class="panel-body">
    {% for module in site.data.modules %}
        {% if module.year == year %}
            {% if module.prerequisites == '' %}
                <div
                    class="module-button {{ module.code }}"
                    onmouseover="display_info({{ module.code }})"
                    onmouseout="remove_info({{ module.code }})">
                    <label>
                        <input
                            type="checkbox"
                            class="module-checkbox"
                            id="{{ module.code }}"
                            module_title="{{ module.title }}"
                            prerequisites="{{ module.prerequisites }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            onchange="update_counter(this, true)">
                        <span>{{ module.code }}</span>
                    </label>
                </div>
            {% else %}
                <div
                    class="module-button {{ module.code }}"
                    onmouseover="display_info({{ module.code }})"
                    onmouseout="remove_info({{ module.code }})">
                    <label>
                        <input
                            type="checkbox"
                            class="module-checkbox"
                            id="{{ module.code }}"
                            module_title="{{ module.title }}"
                            prerequisites="{{ module.prerequisites }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            onchange="update_counter(this, true)"
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
<div class="panel panel-default panel-right"><div class="panel-right-body" id="display-panel-{{ year }}"></div></div>
</div>
{% endfor %}