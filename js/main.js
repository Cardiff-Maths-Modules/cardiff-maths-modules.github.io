var credits_selected = {"1":0, "2":0, "3":0};

var update_counter = function(checkbox) {
    var emoji = ''
    let year = checkbox.getAttribute('year')
    let credits = parseInt(checkbox.getAttribute('credits'))
    if(checkbox.checked == true){
        credits_selected[year] += credits;
        update_subsequent_modules(checkbox.id, true)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
        document.getElementById("year-" + year + "-counter").innerHTML = emoji + " Credits Selected: " + credits_selected[year];
     }else{
        credits_selected[year] -= credits;
        update_subsequent_modules(checkbox.id, false)
        if (credits_selected[year] == 120){
            emoji = twemoji.parse('✔️')
        } else if (credits_selected[year] > 120) {
            emoji = twemoji.parse('❌')
        };
        document.getElementById("year-" + year + "-counter").innerHTML = emoji + " Credits Selected: " + credits_selected[year];
    };
};


var update_subsequent_modules = function(module_code, chosen) {
    modules = document.getElementsByClassName("module-checkbox")
    for (let mod = 0; mod < modules.length; mod++){
        let prerequisites_string = modules[mod].getAttribute('prerequisites')
        if (prerequisites_string.includes(module_code)){
            if (chosen){
                modules[mod].disabled = false
            }else{
                if (modules[mod].checked){
                    modules[mod].checked = false
                    update_counter(modules[mod])
                }
                modules[mod].disabled = true
            }
        }
    };
};