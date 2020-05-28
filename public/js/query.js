export class Query {
    'use strict';

    constructor() {
        this.url = 'http://localhost:8080/api/';
    }

    async query(urlProperty, queryProperty) {
        let url = new URL(this.url);
        url.pathname += urlProperty['search'] || '';
        url.search += urlProperty['filter'] || '';
        return await fetch(url, queryProperty).then(response => response.json());
    }

    select(urlProperty, property) {
        property['method'] = 'GET';
        return this.query(urlProperty, property);
    }

    delete(urlProperty, property) {
        property['method'] = 'DELETE';
        return this.query(urlProperty, property);
    }

    create(urlProperty, property) {
        property['method'] = 'POST';
        return this.query(urlProperty, property);
    }

    update(urlProperty, property) {
        property['method'] = 'PATCH';
        return this.query(urlProperty, property);
    }
}   