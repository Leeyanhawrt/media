import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// REMOVE FOR PROD
// SETTING ARTIFICAL PAUSE TO ENSURE SPINNERS ARE WORKING
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    // REMOVE FOR PROD
    // OVERRIDE DEFAULT FETCH FUNCTION WHEN RAN 
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            },
            method: "POST",
          };
        }
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id
            },
            method: 'GET',
          };
        }
      })
    };
  }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };