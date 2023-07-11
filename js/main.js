$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            next: "Next",
            previous: "Back"
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                // Validation for the first step
                var firstName = $('.form-holder input[name="firstName"]').val();
                var lastName = $('.form-holder input[name="lastName"]').val();
                var birthday = $('.form-holder input[name="birthday"]').val();
                var report = $('.form-holder input[name="report"]').val();
                var country = $('.select-control').val();
                var phone = $('.form-holder input[name="phone"]').val();
                var email = $('.form-holder input[name="email"]').val();
 
                if (firstName === '') {
                    document.getElementById("fname-error").style.display = "block";
                    return false; // Prevent moving to the next step
                } else {
                    document.getElementById("fname-error").style.display = "none";
                }
                if (lastName === '') {
                    document.getElementById("lname-error").style.display = "block";
                    return false; 
                } else {
                    document.getElementById("lname-error").style.display = "none";
                }
                if (birthday === '') {
                    document.getElementById("birthday-error").style.display = "block";
                    return false; 
                } else {
                    document.getElementById("birthday-error").style.display = "none";
                }
                if (report === '') {
                    document.getElementById("report-error").style.display = "block";
                    return false; 
                } else {
                    document.getElementById("report-error").style.display = "none";
                }
                if (country === '' || country === "Country"){
                    document.getElementById("country-error").style.display = "block";
                    return false; 
                } else {
                    document.getElementById("country-error").style.display = "none";
                }

                if (phone === '') {
                    document.getElementById("phone-error").style.display = "block";
                    document.getElementById("phone-error").innerHTML = "Phone is required";
                    return false; 
                } 
                else if (!/^.?1.?\(?[0-9]{3}\)?.?[0-9]{3}.?[0-9]{4}$/.test(phone)) {
                    document.getElementById("phone-error").style.display = "block";
                    document.getElementById("phone-error").innerHTML = "Invalid phone number";
                    return false;
                  }
                
                else {
                    document.getElementById("phone-error").style.display = "none";
                }

                if (email === '') {
                    document.getElementById("email-error").style.display = "block";
                    document.getElementById("email-error").innerHTML = "Email is required";
                    return false; 
                } 
                
                else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(phone)) {
                    document.getElementById("email-error").style.display = "block";
                    document.getElementById("email-error").innerHTML = "Invalid email";
                    return false;
                  }
                
                else {
                    document.getElementById("email-error").style.display = "none";
                }
              } 
    
            if (currentIndex === 1) {
                var file = $('.form-holder input[name="file"]').val();
                var formData = new FormData($(this)[0]);
      
                $.ajax({
                    url: 'image.php',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                    if (response === 'valid') {
                        // File format is valid, submit the form
                        $('#uploadForm')[0].submit();
                    }
                    }
                });
	        };
            
            

            if ( newIndex === 1 ) {
                $('.steps').addClass('step-2');

            } else {
                $('.steps').removeClass('step-2');
            }

            

            if ( newIndex === 2 ) {
                
                $('.steps').addClass('step-3');


            } else {
                $('.steps').removeClass('step-3');
            }
            return true; 
        }
    });
   

    // Custom Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
        
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Select
    $('html').click(function() {
        $('.select .dropdown').hide(); 
    });
    $('.select').click(function(event){
        event.stopPropagation();
    });
    $('.select .select-control').click(function(){
        $(this).parent().next().toggle().toggleClass('active');
    })
    $('.select .dropdown li').click(function(){
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })
   
    // Date Picker
    var dp1 = $('#dp1').datepicker().data('datepicker');
})

