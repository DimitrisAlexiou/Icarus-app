import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/config';

const teachingApi = createApi({
	reducerPath: 'teachings',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints(builder) {
		return {
			deleteTeaching: builder.mutation({
				invalidatesTags: (result, error, teaching) => {
					return [{ type: 'Teaching', id: teaching.id }];
				},
				query: (teaching) => {
					return {
						url: `/course/taeching/${teaching.id}`,
						method: 'DELETE',
					};
				},
			}),
			addTeaching: builder.mutation({
				invalidatesTags: (result, error, course) => {
					return [{ type: 'CoursesTeaching', id: course.id }];
				},
				query: (course) => {
					return {
						url: '/course/teaching',
						method: 'POST',
						body: {
							courseId: course.id,
						},
					};
				},
			}),
			fetchTeachings: builder.query({
				providesTags: (result, error, user) => {
					const tags = result.map((teaching) => {
						return { type: 'Teaching', id: teaching.id };
					});
					tags.push({ type: 'UsersAlbums', id: user.id });
					return tags;
				},
				query: (user) => {
					return {
						url: '/course/teaching',
						params: {
							userId: user.id,
						},
						method: 'GET',
					};
				},
			}),
		};
	},
});

export const {
	useFetchTeachingsQuery,
	useUpdateTeachingMutation,
	useAddTeachingMutation,
	useDeleteTeachingMutation,
} = teachingApi;
export { teachingApi };
