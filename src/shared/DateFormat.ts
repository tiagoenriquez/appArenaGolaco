export class DateFormat {

    static year: string;
    static month: string
    static day: string
    static hour: string;
    static minute: string;
    static second: string;

    // Recebe data no formato exemplo "Sun Dec 06 2020 11:32:08 GMT-0300 (Horário Padrão de Brasília)".

    static convertDateTimePrint(date: string): string {
        this.year = this.getYear(date);
        this.month = this.getMonth(date);
        this.day = this.getDay(date);
        this.hour = this.getHour(date);
        this.minute = this.getMinute(date);
        this.second = this.getSecond(date);
        return this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
    }

    // Recebe data no formato exemplo "2020-12-11T22:50:20.474-03:00" ou "2020-12-11 22:50:20".

    static convertTimePrint(date: string): string {
        let time: string = "";
        for(let i = 11; i < 19; i++) {
            time += date[i];
        }
        return time;
    }

    // Recebe data no formato exemplo "2020-12-11T22:50:20.474-03:00" ou "2020-12-11 22:50:20".

    static convertDateApi(date: string): string {
        this.year = date[0] + date[1] + date[2] + date[3];
        this.month = date[5] + date[6];
        this.day = date[8] + date[9];
        return this.year + "-" + this.month + "-" + this.day;
    }

    static getYear(date: string): string {
        return date[11] + date[12] + date[13] + date[14];
    }

    static getMonth(date: string): string {
        let month = date[4] + date[5] + date[6];
        switch(month) {
            case "Jan": return "01";
            case "Feb": return "02";
            case "Mar": return "03";
            case "Apr": return "04";
            case "May": return "05";
            case "Jun": return "06";
            case "Jul": return "07";
            case "Aug": return "08";
            case "Sep": return "09";
            case "Oct": return "10";
            case "Nov": return "11";
            case "Dec": return "12";
        }
    }

    static getDay(date: string): string {
        return date[8] + date[9];
    }

    static getHour(date: string): string {
        return date[16] + date[17];
    }

    static getMinute(date: string): string {
        return date[19] + date[20];
    }

    static getSecond(date: string): string {
        return date[22] + date[23];
    }

}