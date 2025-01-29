import {get} from "../utils/http.ts";


export function helloApi() {
    return get<string>('/api/hello');
}