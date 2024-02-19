import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { SPOTIFY_BASE_URL } from "$env/static/private";

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
    const accessToken = cookies.get('access_token');
    const refresh_token = cookies.get('refresh_token');
    if(!accessToken) {
        return {
            user: null
        }
    }

    // Get user information
    const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if(profileRes.ok) {
        const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
        return {
            user: profile
        };
    } 

    if(profileRes.status === 401 && refresh_token){
        //Refresh token and try again
        const refreshRes = await fetch('/api/auth/refresh');
        if(refreshRes.ok){
            throw redirect(307, url.pathname)
        }
        return {
            user: null
        }
    } else {
        return {
            user: null
        };
    }
}