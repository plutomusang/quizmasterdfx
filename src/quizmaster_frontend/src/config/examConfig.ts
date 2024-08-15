interface ExamConfigItem {
  title: string;
  key: string;
  path: string;
  url: string;
}

const examConfig: ExamConfigItem[] = [
  { 
    title: "Google Cloud Architecture", 
    key: "GCPArchitecture",
    path: "./exam-json/GoogleCloudDeveloper_Exam_Dump.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/exam.json"  
  },
  { 
    title: "Google Mobility Service", 
    key: "GoogleMobilityService",
    path: "./exam-json/Grade6_quizmaster_lever.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/Grade6_quizmaster_lever.json"  
  },
  { 
    title: "Google Cloud Developer Cloud Guro", 
    key: "GoogleCloudDeveloperCloudGuro",
    path: "./exam-json/Grade6_quizmaster_InclinePlane.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/Grade6_quizmaster_InclinePlane.json"  
  },
  { 
    title: "Google Cloud Digital Leader", 
    key: "GoogleCloudDigitalLeader",
    path: "./exam-json/Data_Processor_Vm.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/Data_Processor_Vm.json"  
  },
  {
    title: "Grade 6 Quizmaster Incline Plane", 
    key: "Grade6QuizmasterInclinePlane",
    path: "./exam-json/GCPArchitecture.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/GCPArchitecture.json"
  },
  {
    title: "Grade 6 Quizmaster Lever", 
    key: "Grade6QuizmasterLever",
    path: "./exam-json/GCPArchitecture.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/GCPArchitecture.json"
  },
  {
    title: "React Basics", 
    key: "ReactBasics",
    path: "./exam-json/GCPArchitecture.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/GCPArchitecture.json"
  },
  {
    title: "React Quiz", 
    key: "ReactQuiz",
    path: "./exam-json/GCPArchitecture.json",
    url: "https://exam-bucket-test1.storage.googleapis.com/GCPArchitecture.json"
  }

];

export default examConfig;
