
const baseUrl= "http://localhost:5000/api";

export const environment={
    //auth
    loginUrl:`${baseUrl}/auth/login`,
    signupUrl: `${baseUrl}/auth/register`,
    changePasswordUrl: `${baseUrl}/auth/change-password`,
    EditPreferencesUrl:`${baseUrl}/auth/update-preferences`,
    reportUrl:`${baseUrl}/report`,
    locationsUrl:`${baseUrl}/hotels/locations`,
    bookingsUrl:`${baseUrl}/bookings`,
    rescheduleBookingUrl:`${baseUrl}/bookings/reschedule`,
    bookmarksUrl:`${baseUrl}/bookmarks`,
    hotelUrl:`${baseUrl}/hotels`,
    appTitle:"TripEase"
};