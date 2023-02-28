---
layout: main
---


<div class="row options-row">
  <div class="col-lg-6">
    <div class="input-group">
      <span class="input-group-addon">
        <input class="form-check-input" type="checkbox" id="show_welsh" onchange="toggle_welsh_provision(this, 3)">
      </span>
      <label class="form-control">Include Welsh provision</label>
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <input class="btn btn-primary btn-reset" value="Reset Choices" onclick="reset_all()">
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->


{% for year in (1..3) %}
<div style="display: flex;">
<div class="panel panel-default panel-left">
  <div class="panel-heading">Year {{ year }}</div>
  <div class="panel-body">
    {% for module in site.data.modules %}
        {% if module.year == year %}
            {% if module.prerequisites %}
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
                            clashes="{{ module.clashes }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            welsh_title="{{ module.welsh-title }}"
                            welsh_credits="{{ module.welsh-credits }}"
                            welsh_code="{{ module.welsh-code }}"
                            onchange="update_counter(this, true)"
                            disabled>
                        <span class="module-checkbox-label" module_code="{{ module.code }}" welsh_code="{{ module.welsh-code }}">{{ module.code }}</span>
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
                            clashes="{{ module.clashes }}"
                            credits="{{ module.credits }}"
                            year="{{ year }}"
                            welsh_title="{{ module.welsh-title }}"
                            welsh_credits="{{ module.welsh-credits }}"
                            welsh_code="{{ module.welsh-code }}"
                            onchange="update_counter(this, true)">
                        <span class="module-checkbox-label" module_code="{{ module.code }}" welsh_code="{{ module.welsh-code }}">{{ module.code }}</span>
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