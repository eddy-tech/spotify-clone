import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../callback/$types";

export const POST: RequestHandler = ({ cookies, request }) => {
    cookies.delete('refresh_token', { path: '/'} )
    cookies.delete('access_token', { path: '/'} )

    if(request.headers.get('content') === 'application/json'){
        return json({ success: true })
    }

    throw redirect(303, '/');
}