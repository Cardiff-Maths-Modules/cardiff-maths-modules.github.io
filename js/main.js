var credits_selected = {"1":0, "2":0, "3":0, "4":0};
var welsh_credits_selected = {"1":0, "2":0, "3":0, "4":0};

var update_counter = function(module_checkbox) {
    // This function takes in a `module_checkbox`, an instance of the checkbox object.
    // It will:
    //     + increase the `credits_selected` by the relevant amound of credits;
    //     + rewrite the html in the panel footer to reflect the credits;
    //     + add a tick or cross emoji if the number of credits for that year
    //       is either 120 (tick) or over 120 (cross);
    //     + call `update_subsequent_modules` to disable or enable the approproate modules.
    var emoji = ''
    let year = module_checkbox.getAttribute('year')
    let credits = parseInt(module_checkbox.getAttribute('credits'))
    let id = module_checkbox.id
    let welsh_credits = parseInt(module_checkbox.getAttribute('welsh_credits'))
    let offered_in_welsh = module_checkbox.getAttribute('welsh_code') != ''

    if(module_checkbox.checked == true){
        credits_selected[year] += credits;
        if (offered_in_welsh) {
            welsh_credits_selected[year] += welsh_credits
        }
        update_subsequent_modules(id, true)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
     } else {
        credits_selected[year] -= credits;
        if (offered_in_welsh) {
            welsh_credits_selected[year] -= welsh_credits
        }
        update_subsequent_modules(id, false)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
    };
    document.getElementById("year-" + year + "-counter").innerHTML = emoji + " Credits Selected: " + credits_selected[year];
    let show_welsh_provision = document.getElementById("show_welsh").checked;
    if (show_welsh_provision){
        document.getElementById("year-" + year + "-counter-cymraeg").innerHTML = "Credydau Cymraeg: " + welsh_credits_selected[year];
    }
};


var all_prerequisites_checked = function(module_checkbox) {
    // This function takes in `module_checkbox`, an instance of the checkbox object
    // and returns a Boolean indicating if _all_ its prerequisites are checked or not
    prerequisites_string = module_checkbox.getAttribute('prerequisites')
    if (prerequisites_string == ''){
        return true;
    }else{
        let prerequisites = prerequisites_string.split(/(?=M)/g);
        const check = (preq) => document.getElementById(preq).checked;
        return prerequisites.every(check)
    };
};


var clash_is_checked = function(clash_code) {
    // This function takes in module cose string, an instance of the checkbox object
    // and returns a Boolean indicating it's checked or not,
    // returns false if module does not exist.
    let clash_checkbox = document.getElementById(clash_code);
    if (clash_checkbox) {
        return clash_checkbox.checked
    }else{
        return false
    };
};


var any_clashes_checked = function(module_checkbox) {
    // This function takes in `module_checkbox`, an instance of the checkbox object
    // and returns a Boolean indicating if _any_ its clashes are checked or not
    clashes_string = module_checkbox.getAttribute('clashes')
    if (clashes_string == ''){
        return false;
    }else{
        let clashes = clashes_string.split(/(?=M)/g);
        const check = (clsh) => clash_is_checked(clsh);
        return clashes.some(check)
    };
};


var update_subsequent_modules = function(module_code, chosen) {
    // This function takes in;
    //     + `module_code`, a string of the module code currently being checked of unchecked
    //     + `chosen`, a Boolean: 'true' if the module is being checked, 'false' if it is being unchecked.
    // It first loops through all that modules clashes, either disabling or un-disabling the clashed module as appropriate.
    // Then it loops through each module, checks whether the current module is one of its prerequisites, and then:
    //     + disables that module if `chosen` is false (updating the counter if disabling a checked module)
    //     + enables the current module if _all_ prerequisites for that module are not checked.
    
    this_module = document.getElementById(module_code)
    let clashes_string = this_module.getAttribute('clashes')
    if (clashes_string != '') {
        clashes = clashes_string.split(/(?=M)/g);
        for (let clsh = 0; clsh < clashes.length; clsh++) {
            clashed_module = document.getElementById(clashes[clsh])
            if (clashed_module && all_prerequisites_checked(clashed_module)) {
                clashed_module.disabled = chosen
            }
        }
    }

    modules = document.getElementsByClassName("module-checkbox")
    for (let mod = 0; mod < modules.length; mod++){
        let prerequisites_string = modules[mod].getAttribute('prerequisites')
        if (prerequisites_string.includes(module_code)){
            if (chosen){
                if (all_prerequisites_checked(modules[mod]) && !any_clashes_checked(modules[mod]) ){ // checks if _all_ prerequisites are checked _and_ if _not_ _any_ clashes are checked
                    modules[mod].disabled = false
                }
            }else{
                if (modules[mod].checked){ // only updates the counter if it was checked, and disabling the module unchecks it
                    modules[mod].checked = false
                    update_counter(modules[mod])
                }
                modules[mod].disabled = true
            }
        }
    };
};


var display_info = function(module_checkbox) {
    // This function is used when the mouse hovers over a button.
    // This function takes in `module_checkbox`, an instance of the checkbox object
    // It fills in the side panel with information about the module selected
    let code = module_checkbox.id.slice(0, 6)
    let year = module_checkbox.getAttribute('year')
    let title = module_checkbox.getAttribute('module_title')
    let credits = module_checkbox.getAttribute('credits')
    let semester = module_checkbox.getAttribute('semester')
    let extra_s = '';
    if (semester == 'Both'){
        extra_s = 's';
    }
    
    let welsh_code = module_checkbox.getAttribute('welsh_code')
    let welsh_title = module_checkbox.getAttribute('welsh_title')
    let welsh_credits = parseInt(module_checkbox.getAttribute('welsh_credits'))
    let offered_in_welsh = module_checkbox.getAttribute('welsh_code') != ''
    let show_welsh_provision = document.getElementById("show_welsh").checked;

    if (show_welsh_provision && offered_in_welsh) {
        content = "<h2>" + welsh_code + "</h2><h4 class='module_title_heading'><i>" + welsh_title + "</i></h4><h4 class='module_semester'>" + semester + " semester" + extra_s + "</h4><p class='module_credits'>" + credits + " credits</p><p class='module_credits'>(" + welsh_credits + " credyd Cymraeg)</p>";
    } else {
        content = "<h2>" + code + "</h2><h4 class='module_title_heading'><i>" + title + "</i></h4><h4 class='module_semester'>" + semester + " semester" + extra_s + "</h4><p class='module_credits'>" + credits + " credits</p><p class='module_credits'></p>";
    }

    let prerequisites_string = module_checkbox.getAttribute("prerequisites")
    if (prerequisites_string != ''){
        let prerequisites = prerequisites_string.split(/(?=M)/g);
        content = content.concat("<p><br>Prerequisites:")
        for (let preq=0; preq < prerequisites.length; preq++) {
            let preq_module = document.getElementById(prerequisites[preq]);
            let preq_offered_in_welsh = preq_module.getAttribute('welsh_code') != ''
            let preq_code = preq_module.getAttribute('id');
            if (preq_offered_in_welsh && show_welsh_provision){
                preq_code = preq_module.getAttribute('welsh_code');
            }
            if (preq_module.checked == false) {
                content = content.concat("<br><m class='red_preq'>" + preq_code + "</m>")
            } else {
                content = content.concat("<br>" + preq_code)
            }
        }
        content = content.concat("</p>")
    }

    let clashes_string = module_checkbox.getAttribute("clashes")
    if (clashes_string != ''){
        let clashes = clashes_string.split(/(?=M)/g);
        content = content.concat("<p><br>Clashes:")
        for (let clsh=0; clsh < clashes.length; clsh++) {
            let clash_module = document.getElementById(clashes[clsh]);
            if (clash_module) {
                let clsh_offered_in_welsh = clash_module.getAttribute('welsh_code') != ''
                let clsh_code = clash_module.getAttribute('id');
                if (clsh_offered_in_welsh && show_welsh_provision){
                    clsh_code = clash_module.getAttribute('welsh_code');
                }
                if (clash_module.checked == true) {
                    content = content.concat("<br><m class='red_preq'>" + clsh_code + "</m>")
                } else {
                    content = content.concat("<br>" + clsh_code)
                }
            }
        }
        content = content.concat("</p>")
    }
    document.getElementById("display-panel-" + year).innerHTML = content;
};


var remove_info = function(module_checkbox) {
    // This function is used when the mouse stops hovering over a button.
    // This function takes in `module_checkbox`, an instance of the checkbox object
    // It removes information from the side panel
    let year = module_checkbox.getAttribute('year')
    document.getElementById("display-panel-" + year).innerHTML = "";
};


var toggle_welsh_provision = function(welsh_checkbox, years_list) {
    // This funtion is used when the 'include welsh provision' is checked or unchecked.
    // If checked, it:
    //     + Displays the number of Welsh credits chosen
    //     + Changes the code of Welsh modules to bilingual or Welsh codes
    // If unchecked, it:
    //     + Hides the number of Welsh credits chosen
    //     + Changed the code of Welsh modules to standard codes
    modules = document.getElementsByClassName("module-checkbox-label")
    let years_string = String(years_list)
    if (welsh_checkbox.checked == true) {
        for (let y=0; y < years_string.length; y++) {
            let year = years_string[y];
            document.getElementById("year-" + year + "-counter-cymraeg").innerHTML = "Credydau Cymraeg: " + welsh_credits_selected[year];
        }
        for (let mod = 0; mod < modules.length; mod++) {
            if (modules[mod].getAttribute('welsh_code') != '') {
                modules[mod].innerHTML = modules[mod].getAttribute('core_indicator') + ' ' + modules[mod].getAttribute('welsh_code') + ' ' + modules[mod].getAttribute('core_indicator')
            }
        }
    }
    if (welsh_checkbox.checked == false) {
        for (let y=0; y < years_string.length; y++) {
            let year = years_string[y];
            document.getElementById("year-" + year + "-counter-cymraeg").innerHTML = "";
        }
        for (let mod = 0; mod < modules.length; mod++) {
            if (modules[mod].getAttribute('welsh_code') != '') {
                modules[mod].innerHTML = modules[mod].getAttribute('core_indicator') + ' ' + modules[mod].getAttribute('module_code') + ' ' + modules[mod].getAttribute('core_indicator')
            }
        }
    }
};


var reset_all = function() {
    // This function resets all choices
    modules = document.getElementsByClassName("module-checkbox")
    for (let mod = 0; mod < modules.length; mod++){
        if (modules[mod].checked){ // only updates the counter if it was checked, and disabling the module unchecks it
            modules[mod].checked = false
            update_counter(modules[mod])
        };
    };
};


var change_glyph = function(collapser) {
    // This swaps the arrow from down to up, and vice versa, on clicking.
    let down = 'More information...<span style="float: right;" class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>';
    let up = 'More information...<span style="float: right;" class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>';
    if (collapser.innerHTML == down) {
        collapser.innerHTML = up
    } else {
        collapser.innerHTML = down
    }
}

