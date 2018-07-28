const axios = require('axios');
const _     = require('lodash');

class Search {
    constructor(day) {
        this.day = day;
    }
    
    async getResults() {
        try {
            const res = await axios.get(`https://data.sfgov.org/resource/bbb8-hzi6.json?dayorder=${this.day}`)
            this.result = res.data;
            this.nameAndLocation = this.result.map(cur => _.pick(cur, ['applicant', 'location']));
            this.sortAlphabetically();
        } catch(error) {
            console.log(error);
        }
    }

    sortAlphabetically() {
        this.nameAndLocation.sort((a, b) => {
            var x = a.applicant.toLowerCase();
            var y = b.applicant.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }
}

module.exports = Search;