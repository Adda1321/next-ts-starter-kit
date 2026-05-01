import {useMemo} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

// Queries
const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      imageUrl
      technologies
      githubUrl
      liveUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      imageUrl
      technologies
      githubUrl
      liveUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

// Mutations
const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      imageUrl
      technologies
      githubUrl
      liveUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      imageUrl
      technologies
      githubUrl
      liveUrl
      userId
      updatedAt
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      title
      description
      imageUrl
      technologies
      githubUrl
      liveUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Hooks
export function useProjects() {
  const {data, loading, error, refetch} = useQuery(GET_PROJECTS);

  return useMemo(
    () => ({
      projects: data?.projects || [],
      loading,
      error,
      refetch,
    }),
    [data, loading, error, refetch],
  );
}

export function useProject(id: string) {
  const {data, loading, error, refetch} = useQuery(GET_PROJECT, {
    variables: {id},
    skip: !id,
  });

  return useMemo(
    () => ({
      project: data?.project,
      loading,
      error,
      refetch,
    }),
    [data, loading, error, refetch],
  );
}

export function useCreateProject() {
  const [createProject, {loading, error}] = useMutation(CREATE_PROJECT);

  const create = async (input: CreateProjectInput) => {
    try {
      const result = await createProject({
        variables: {input},
      });
      return result.data?.createProject;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  return useMemo(
    () => ({
      createProject: create,
      loading,
      error,
    }),
    [create, loading, error],
  );
}

export function useUpdateProject() {
  const [updateProject, {loading, error}] = useMutation(UPDATE_PROJECT);

  const update = async (id: string, input: UpdateProjectInput) => {
    try {
      const result = await updateProject({
        variables: {id, input},
      });
      return result.data?.updateProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  return useMemo(
    () => ({
      updateProject: update,
      loading,
      error,
    }),
    [update, loading, error],
  );
}

export function useDeleteProject() {
  const [deleteProject, {loading, error}] = useMutation(DELETE_PROJECT);

  const remove = async (id: string) => {
    try {
      const result = await deleteProject({
        variables: {id},
      });
      return result.data?.deleteProject;
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  return useMemo(
    () => ({
      deleteProject: remove,
      loading,
      error,
    }),
    [remove, loading, error],
  );
}
