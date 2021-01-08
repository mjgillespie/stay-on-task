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
      notes
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
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubject = /* GraphQL */ `
  query GetSubject($studentId: ID!, $hash: String!) {
    getSubject(studentId: $studentId, hash: $hash) {
      studentId
      hash
      name
      daysOfWeek
      createdAt
      updatedAt
    }
  }
`;
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $studentId: ID
    $hash: ModelStringKeyConditionInput
    $filter: ModelSubjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSubjects(
      studentId: $studentId
      hash: $hash
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        studentId
        hash
        name
        daysOfWeek
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      role
      students
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: String
    $filter: ModeluserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        role
        students
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
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
