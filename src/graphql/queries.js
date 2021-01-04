/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTask = /* GraphQL */ `
  query GetTask(
    $studentId: ID!
    $status: Status!
    $dueDate: String!
    $hash: String!
  ) {
    getTask(
      studentId: $studentId
      status: $status
      dueDate: $dueDate
      hash: $hash
    ) {
      studentId
      status
      hash
      dueDate
      name
      subject
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $studentId: ID
    $statusDueDateHash: ModelTaskPrimaryCompositeKeyConditionInput
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTasks(
      studentId: $studentId
      statusDueDateHash: $statusDueDateHash
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        studentId
        status
        hash
        dueDate
        name
        subject
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todoByStatus = /* GraphQL */ `
  query TodoByStatus(
    $status: Status
    $dueDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todoByStatus(
      status: $status
      dueDate: $dueDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        studentId
        status
        hash
        dueDate
        name
        subject
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
