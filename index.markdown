---
layout: main
---


<div class="input-group">
  <span class="input-group-addon">
    <input class="form-check-input" type="checkbox" id="show_welsh" onchange="toggle_welsh_provision(this, 3)">
  </span>
  <label class="form-control">Include Welsh provision</label>
</div>
 

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
                            welsh_title="{{ module.welsh-title }}"
                            welsh_credits="{{ module.welsh-credits }}"
                            welsh_code="{{ module.welsh-code }}"
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
                            welsh_title="{{ module.welsh-title }}"
                            welsh_credits="{{ module.welsh-credits }}"
                            welsh_code="{{ module.welsh-code }}"
                            onchange="update_counter(this, true)"
                            disabled>
                        <span>{{ module.code }}</span>
                    </label>
                </div>
            {% endif %}
        {% endif %}
    {% endfor %}
  </div>
  <div class="panel-footer">
    <div class="panel-footer-left" id="year-{{ year }}-counter-cymraeg"></div>
    <div class="panel-footer-right" id="year-{{ year }}-counter">Credits Selected: 0</div>
</div>
</div>
<div class="panel panel-default panel-right"><div class="panel-right-body" id="display-panel-{{ year }}"></div></div>
</div>
{% endfor %}