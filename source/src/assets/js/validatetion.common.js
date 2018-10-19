/* eslint-disable */
export default {
    validatetionRequired(input, msg) {
        var data = input.val();
        console.log(data);
        if (data == undefined || data == "") {
            input
                .parent()
                .parent()
                .append('<span class="select_err_msg">' + msg + "</span>");
            return false;
        }
        return true;
    },

    validatetionDateFormat(input, msg) {
        // First check for the pattern
        var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        var dateString = input.val();
        if (dateString === "") {
            return;
        }
        var check = false;
        if (!regex_date.test(dateString)) {
            check = true;
            msg = msg + "is not date"
        } else {
            // Parse the date parts to integers
            var parts = dateString.split("-");
            var day = parseInt(parts[2], 10);
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[0], 10);

            // Check the ranges of month and year
            if (year < 1000 || year > 3000 || month == 0 || month > 12) {
                check = true;
                msg = msg + " is error date range"
            } else {
                var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                // Adjust for leap years
                if (year % 400 === 0 || (year % 100 != 0 && year % 4 == 0)) {
                    monthLength[1] = 29;
                }

                // Check the range of the day
                check = day <= 0 || day !== monthLength[month - 1];
                msg = msg + " is error day range"
            }
        }

        if (check === true) {
            input
                .parent()
                .parent()
                .append(
                    '<span class="select_err_msg">' + msg + "</span>"
                );
        }
    }
}