import {createRouter} from 'vue-router';
import Homepage from './home/home.vue';

const routes = [
    {
        path: '/',
        component: Homepage
    },
]

export default function(history) {
    return createRouter({
        history,
        routes
    })
}