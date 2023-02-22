var credits_selected = {"1":0, "2":0, "3":0};

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

    if(module_checkbox.checked == true){
        credits_selected[year] += credits;
        update_subsequent_modules(id, true)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
        document.getElementById("year-" + year + "-counter").innerHTML = emoji + " Credits Selected: " + credits_selected[year];
     } else {
        credits_selected[year] -= credits;
        update_subsequent_modules(id, false)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
        document.getElementById("year-" + year + "-counter").innerHTML = emoji + " Credits Selected: " + credits_selected[year];
    };
};

var all_prerequisites_checked = function(module_checkbox) {
    // This function takes in `module_checkbox`, an instance of the checkbox object
    // and returns a Boolean indicating if _all_ its prerequisites are checked or not
    prerequisites_string = module_checkbox.getAttribute('prerequisites')
    if (prerequisites_string == ''){
        return true;
    }else{
        let prerequisites = prerequisites_string.split("-");
        const check = (preq) => document.getElementById(preq).checked;
        return prerequisites.every(check)
    };
};


var update_subsequent_modules = function(module_code, chosen) {
    // This function takes in;
    //     + `module_code`, a string of the module code currently being checked of unchecked
    //     + `chosen`, a Boolean: 'true' if the module is being checked, 'false' if it is being unchecked.
    // It loops through each module, checks whether the current module is one of its prerequisites, and then:
    //     + disables that module if `chosen` is false (updating the counter if disabling a checked module)
    //     + enables the current module if _all_ prerequisited for that module are not checked.
    modules = document.getElementsByClassName("module-checkbox")
    for (let mod = 0; mod < modules.length; mod++){
        let prerequisites_string = modules[mod].getAttribute('prerequisites')
        if (prerequisites_string.includes(module_code)){
            if (chosen){
                if (all_prerequisites_checked(modules[mod])){ // checks if _all_ prerequisites are checked
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