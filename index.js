// The provided course information.
// Defines an object CourseInfo with the course id and name.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
// This defines an object Assignment Group with the assignment group and their due_at.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
// This defines an array LearnerSubmissions with details about each learner's submissions, assisgnment_id and submission date.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log(result);
//Define the function and its parameters.
// Defines a function getLearnerData that takes three paremeters:course, assignment group and submissions
function getLearnerData(course, ag, submissions) {
  //Set a reference date for filtering assignments
  // Date object representing March 1,2023 is used as a reference Date to filter out assisgnments that are not yet due. 
  const referenceDate = new Date("2023-03-01");

  // Filter the assignments to include only those that are due on or before the referrence date. This line filters the assignments in the ag.assignments array to include only those that are due on or before the referenceDate. The filter method creates a new array dueAssignments containing only the assignments that meet this condition.
  const dueAssignments = ag.assignments.filter(
    (a) => new Date(a.due_at) <= referenceDate
  );

  //Initialize an empty array result[] that will be used to store the transformed learner data.
  let result = [];

  //Starts a for...of loop that iterates over each element in the submissions array.
  for (let submission of submissions) {
    //Searches the result array for an object with an id property that matches the learner_id of the current submission. Returns the first matching element or undefined if no match is found. The result is assigned to the learner.
    let learner = result.find((l) => l.id === submission.learner_id);
    //Checks if the learner variable is undefined 
    if (!learner) {
      //If no matching learner was found, creates a new learner object with these properties submission.learner_id, avg:0,totalPoints:0, totalPossible:0.
      learner = {
        id: submission.learner_id,
        avg: 0,
        totalPoints: 0,
        totalPossible: 0,
      };
      //Add the new created learner object to the result array.
      result.push(learner);
    }

    //Search the dueAssignments array for an assignment object with an id property that matches the assignment_id of the current submission. The find method returns the first matching element or undefined if no match is found. The result is assigned to the variable assignment.
    let assignment = dueAssignments.find(
      (a) => a.id === submission.assignment_id
    );

    //Check if the assignment variable is not undefined (i.e., a matching assignment was found in the dueAssignments array).
    if (assignment) {
      //If a matching assignment is found, calculate the percentage score for the assignment by dividing the score from the submission by the points_possible from the assignment. The result is assigned to the variable percentage.
      let percentage = submission.submission.score / assignment.points_possible;
      //Add a new property to the learner object with the key being the assignment.id and the value being the calculated percentage
      learner[assignment.id] = percentage;
      //Update the totalPoints and totalPossible properties of the learner object by adding the score from the submission and the points_possible from the assignment, respectively. 
      learner.totalPoints += submission.submission.score;      
      learner.totalPossible += assignment.points_possible;
      //Calculate the average score for the learner by dividing the totalPoints by the totalPossible and assigns the result to the avg property of the learner object.
      learner.avg = learner.totalPoints / learner.totalPossible;
    }
  }
  //This loop iterates over each element in the result array and deletes the totalPoints and totalPossible properties from each learner object. These properties were used for intermediate calculations and are no longer needed in the final result.
  for (let i = 0; i < result.length; i++) {
    delete result[i].totalPoints;
    delete result[i].totalPossible;
  }
  //Returns the result array, which now contains the transformed learner data with the calculated average scores and percentage scores for each assignment.
  return result;
}


//the getLearnerData function and logs the result. If an error occurs, it catches the error and logs an error message.
  try {
  const result = getLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions
  );
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error);
}
