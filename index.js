// Test Data 2

// const CourseInfo = { id: 1, name: "Math 101" };
// const AssignmentGroup = {
//   id: 1,
//   name: "Homework",
//   course_id: 1,
//   group_weight: "20",
//   assignments: [
//     { id: 1, name: "Assignment 1", due_at: "2025-01-01", points_possible: 100 },
//     { id: 2, name: "Assignment 2", due_at: "2025-01-26", points_possible: 50 }
//   ]
// };
// const LearnerSubmissions = [
//   { learner_id: 1, assignment_id: 1, submission: { submitted_at: "2025-01-02", score: 90 } },
//   { learner_id: 1, assignment_id: 2, submission: { submitted_at: "2025-01-23", score: 40 } }
// ];

//-------------------------------------------------------------------------------
//Test Data -1
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
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
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;
//---------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
//TODO - Step1 -Validation - CourseInfo & Possible points
//   If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
//    What if points_possible is 0

function validateInput(CourseInfo, AssignmentGroup){
    //Validating for empty string
    validateNotEmpty();
    
    if(AssignmentGroup.course_id != CourseInfo.id)
    {
        throw new Error(`Invalid Input - ${AssignmentGroup.course_id} does not belong to the listed Course ${CourseInfo.course_id}`);
    }
    AssignmentGroup.assignments.forEach((assignment) => {
        if(assignment.points_possible === 0 || !Number(assignment.points_possible)){
            throw new Error(`Invalid Input: ${assignment.id} - Assignment '${assignment.name}' has 0/invalid possible points`);
        }
    })
};
//--------------------------------------------------------------------------------------

function validateNotEmpty(){
    //CourseInfo
    for(const key in CourseInfo)
    {
        if(CourseInfo[key].toString().trim() != "")
            continue;
        else
        {
            throw new Error(`Invalid Input: Please provide input for the CourseInfo - "${key.toUpperCase()}"`);
            break;
        }            
    }

    //Assignment Group
    for(const key in AssignmentGroup)
    {
        if(key.toLowerCase() === "assignments")
        {
            AssignmentGroup.assignments.forEach((assignment) => {
                if(assignment.id.toString().trim() === ""){
                    throw new Error(`Invalid Input: Please provide input for the AssignmentGroup - AssignmentId`);
                }

                if(assignment.name.toString().trim() === ""){
                    throw new Error(`Invalid Input: Please provide input for the AssignmentGroup - Assignemnt Id "${assignment.id}" - Name`);
                }

                if(assignment.due_at.toString().trim() === ""){
                    throw new Error(`Invalid Input: Please provide input for the AssignmentGroup - Assignemnt Id "${assignment.id}" - Due At`);
                }

                if(assignment.points_possible.toString().trim() === ""){
                    throw new Error(`Invalid Input: Please provide input for the AssignmentGroup - Assignemnt Id "${assignment.id}" - points_possible`);
                }
            })
        }
        //check for id, name, course_id, group_weight
        if(AssignmentGroup[key].toString().trim() !== "")
            continue;
        else
        {
            throw new Error(`Invalid Input: Please provide input for the AssignmentGroup - "${key.toUpperCase()}"`);           
        }   
    }
    //Learner Submission
    for(let i = 0; i < LearnerSubmissions.length; i++)
    {
        if(LearnerSubmissions[i].learner_id.toString().trim() === "")
        {
            throw new Error(`Invalid Input: Please provide input for the LearnerSubmissions - Learner Id`);                    
        } 

        if(LearnerSubmissions[i].assignment_id.toString().trim() === "")          
        {
            throw new Error(`Invalid Input: Please provide input for the LearnerSubmissions - Learner Id ${LearnerSubmissions[i].learner_id} - Assignment Id`);           
        }   

        //submitted date and score can be empty 
        //just checking score is a number
        for(const obj of Object.keys(LearnerSubmissions[i])){
            if(obj.toLowerCase() === "submission")
            {
                if(LearnerSubmissions[i].submission.score !== "" && !Number(LearnerSubmissions[i].submission.score))
                {
                    throw new Error(`Invalid Input: Please provide valid input for the LearnerSubmission scores for Learner Id - ${LearnerSubmissions[i].learner_id} `);
                }

                if(LearnerSubmissions[i].submission.score !== "" && LearnerSubmissions[i].submission.submitted_at.trim() === "")
                {
                        throw new Error(`Invalid Input: Please provide valid input for the LearnerSubmission submitted date for Learner Id - ${LearnerSubmissions[i].learner_id} `);
                }
            }
        }
    }
}

//-------------------------------------------------------------------------------------------
//ToDo - Fetch valid assignment, assignment due in past
// If an assignment is not yet due, do not include it in the results or the average. 

function validateAssignment(AssignmentGroup){
    const currentDate = new Date(); 
    let flagValidDate = true; 

    //To validate assignment Due Date is in date format
    AssignmentGroup.assignments.forEach(assignment => {
        if(isInvalidDate(new Date(assignment.due_at)))
        {   
            flagValidDate = false;
            throw new Error(`Invalid Input: Assignment Due date "${assignment.due_at}" is not valid format for Assignment Id - ${assignment.id}`);
        } 
    });

    //If assignment due_at are valid dates, then compare if due in the past (< today) and filter only those assignments
    if(flagValidDate)
    {
        const validAssignment = AssignmentGroup.assignments.filter(assignment =>new Date(formatAssignmentDueDate(assignment.due_at)) < new Date(currentDate.toDateString()));         
        return validAssignment;

        // new Date('2019-01-30 00:00:00')
        // Wed Jan 30 2019 00:00:00 GMT-0500 (Eastern Standard Time)
        // If I removed the +00 part, then Date method would treat the time as the local computer timezone instead of converting to computer timezone from a UTC time.  It will result in previous date --- Wed Jan 29 2019
        // new Date('2019-01-31').toISOString() = "+2019-01-31T00:00:00.000Z"

        //function to add 00:00:00 to get proper datess

        function formatAssignmentDueDate(AssignmentDate)
        {
            const due_at = new Date(AssignmentDate);
            const formattedDate = new Date(due_at.toISOString().replace('.000Z', ''));
            return formattedDate;
        }
    }
}

//-----------------------------------------------------------------------------
//To validate date
function isInvalidDate(date) {        
    return isNaN(Date.parse(date));
  }
//-------------------------------------------------------------------------------

  //ToDo - Calculate Assignment Scores & Weighted Data
  //"avg": number,
  // each assignment should have a key with its ID,
  // and the value associated with it should be the percentage that
  // the learner scored on the assignment (submission.score / points_possible)
function calculateScores_WeightedAvg(LearnerSubmissions, validAssignments)
{
    let flagValidDate = true; 
    let result = [];
    

    //To validate assignment submitted date is in valid format
    LearnerSubmissions.forEach(submission => {   
       
        if(submission.submission.submitted_at.trim()!="" && isInvalidDate(new Date(submission.submission.submitted_at)))
        {   
            flagValidDate = false;
            throw new Error(`Invalid Input: Assignment submitted date "${submission.submission.submitted_at}" is not valid format for Learner Id - ${submission.learner_id}, Assignment Id - 
                ${submission.assignment_id}`);                      
        }     
    });
    
    if(flagValidDate){
        // scores will contain score of more than one assignment for the specific learner
        const scores = {};
        let totalScore = 0;
        let totalPossiblePoints = 0;
        validAssignments.forEach(
            assignment => {
                const submission = LearnerSubmissions.find(sub => sub.assignment_id === assignment.id);

                //Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

                if(submission){
                        let score = submission.submission.score;                     
                        
                        //input data "submitted_at" lies within "submission" object
                        //late submission - detect 10%
                        if(new Date(submission.submission.submitted_at) > new Date(assignment.due_at))
                        {
                            score -= score * 10/100;
                        }
                        scores[submission.assignment_id] = Number((score / assignment.points_possible) * 100).toFixed(2);                        
                        totalScore += score;
                        totalPossiblePoints += assignment.points_possible;
                }
            }
        );
        result[0] = (totalScore / totalPossiblePoints) * 100;
        result[1] = scores;

        return result;
    }  // if statement ends 

}
//----------------------------------------------------------------------------------------------------
//Main calling function
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    try{
        validateInput(course, ag);
        const validAssignments = validateAssignment(ag);

        //To seggregate learners in order to calculate score
        const learners = {};

        //Iterate each submission and 
         submissions.forEach(submission => {

            //for each learners, store id as learner id 
            //and scores are stored as percentage of each assignments along with assignment id
            //if already scores calculated for that learner, we can proceed with other learner

            if(!learners[submission.learner_id])
            {
                learners[submission.learner_id] = {id: submission.learner_id,avg: 0, scores:{}};

                //filter submission for the above learner 
                //calculate scores for the learner considering assignment whose due date completed
                let resultScores_Avg = calculateScores_WeightedAvg(
                    submissions.filter(sub => sub.learner_id === submission.learner_id), validAssignments);
                
                    learners[submission.learner_id].avg = Number(resultScores_Avg[0]).toFixed(2);
                    learners[submission.learner_id].scores = resultScores_Avg[1];               
                    
            } 
        });

        return learners;        
    }
    catch(error)
    {
        console.log(`Errors while processing : ${error.message}`);
        return [];
    }   
    
  }

  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);  
  console.log("Result:");
  console.log(result);

  