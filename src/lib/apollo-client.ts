import {HttpLink} from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {registerApolloClient} from '@apollo/experimental-nextjs-app-support/rsc';

export const {getClient} = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({addTypename: false}),
    link: new HttpLink({
      uri: '/api/v1/graphql',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjViNjAyZTBjYTFmNDdhOGViZmQxMTYwNGQ5Y2JmMDZmNGQ0NWY4MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9hcmR0ZWNoLWZkYmIzIiwiYXVkIjoiYm9hcmR0ZWNoLWZkYmIzIiwiYXV0aF90aW1lIjoxNzA2MTA5OTQ0LCJ1c2VyX2lkIjoiNU11eEYxNFRqZlhLUzVjZm81R2J0QTZ6WjNCMiIsInN1YiI6IjVNdXhGMTRUamZYS1M1Y2ZvNUdidEE2elozQjIiLCJpYXQiOjE3MDYxMDk5NDQsImV4cCI6MTcwNjExMzU0NCwiZW1haWwiOiJhcmp1bnZlcmFubzk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcmp1bnZlcmFubzk1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.HIbXRKkzF52yrWGtwSK0g7_K1ZDeCBiSE0LkF-E0e70iIgFXkKGmvxMom-5AgPf2JaxJMTt6_Fm9Fjx82aldk7ilxz5JzntSobYAzEhFlrAnigXLu5hTuCSWx1mSMEvC0fRwpJgV20_5NRt5jgyKJcOW_FEOVD7bIYBLaafI30jJTjGerhsoAzr-Ah-sG6-OSiOm_cOT60uIOYiApVl7WTRgPdqO9RpyMwm_FQcYW6kYPTB_A5IqumrrK4JFxGUeC1TMuIOn5NKDy_FV7XkZTCIgMPZ_UHj9kwZQasDX200PthUd8-WdF_Y14oh3CY1aOegWaiI1gTl6e6T4PKoShg',
      },
    }),
  });
});
export default getClient();
