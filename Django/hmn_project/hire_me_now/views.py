from django.shortcuts import render
import openai
from os.path import dirname, abspath, join
import environ
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

BASE_DIR = join(dirname(dirname(dirname(abspath(__file__)))))
print(BASE_DIR)
env = environ.Env()
# environ.Env.read_env(join(BASE_DIR, '.env'))

# Create Homepage
def home(request):
    if request.method == "POST":
        question = request.POST['question']
        print(question)
        if question == 'test':
            question = "Job Title: Communications Manager\n" +\
                "Company Name: Techwave Inc.\n" +\
                "Requirements: Bachelor's degree in Communications, Public Relations or a related field; \n" +\
                "5+ years experience in a communication or public relations role;"  +\
                "Exceptional written and verbal communication skills; Strong interpersonal skills to manage relationships with external stakeholders;" +\
                "Experience with social media marketing and content creation; Ability to work collaboratively with cross-functional teams.\n" +\
                "Company Culture: Innovative, fast-paced, and collaborative. Values employee growth and continuous learning. Encourages diversity and inclusion in the workplace." +\
                "\n\nPlease write a sample cover letter for the above-mentioned scenario."

        # Set API Key
        openai.api_key = env('OPEN_AI_KEY')
        # Make a Completion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You act as a professional cover letter writer. I will provide you with a list of job information to you and you will write a cover letter based on those information."},
                {"role": "user", "content": "list key information you need to get your answer."},
                {"role": "assistant", "content": "Great, let's get started. Could you please provide me with the job title, company name, the position's requirements and qualifications, and a brief description of the company culture or values?"},
                {"role": "user", "content": question},
            ]
        )

        # Parse the response
        response = str(response['choices'][0]['message']['content'] + "\n\n" + "I'am {}".format(response['choices'][0]['message']['role']))
        
        # We want to render a webpage, request, template_name => page name, context => return
        return render(request=request, template_name='screen/home.html', context={"question":question, "response": response})
    
    return render(request=request, template_name='screen/home.html', context={})

@api_view(['GET'])
def getRoutes(request):

    routes = [
        "This is a test string",
        11111,
        "Here is multiple data"
    ]
    
    return Response(routes)

@api_view(['POST'])
def generate_cover_letter(request):
    if request.method != 'POST':
        return Response(
            {'Invaild request': 'Get a {} request, instead of POST request'.format(request.method)}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    user_information = {k:v for k, v in request.data.items()}
    
    required_fields = {
        # Personal information
        'userName': 'User Name', 
        'contactInformation': 'Contact Information', 
        'workExperience': 'Work Experience',
        'Skills': 'Personal Skills',
        # Company information
        'companyName': 'Company Name', 
        'jobTitle': 'Job Title',
        'jobDescription': 'Job Description',
        'companyLocation': 'Company Location',
        # Other
        'otherRelevantInformation': 'Other relevant information'
    }
    
    query = "Here is a dictionary including all information about this cover letter" +\
        "Please use any value doesn't have [] as much as possible:\n"
    for k in required_fields:
        if k not in user_information.keys():
            query += "{}: [{}]\n".format(required_fields[k], required_fields[k])
        else:
            query += "{}: {}\n".format(required_fields[k], user_information[k])
    print("User query is:\n", query)
    
    # >>>>>>> Comment Start >>>>>>
    # # Set API Key
    # openai.api_key = env('OPEN_AI_KEY')
    # # Make a Completion
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content": "You act as a professional cover letter writer. I will provide you with a list of job information to you and you will write a cover letter based on those information."},
    #         {"role": "user", "content": "list key information you need to get your answer."},
    #         {"role": "assistant", "content": "Great, let's get started. Could you please provide me with more information about the company and yourself?"},
    #         {"role": "user", "content": query},
    #     ]
    # )

    # # Parse the response
    # response = str(response['choices'][0]['message']['content'] + "\n\n" + "I'am {}".format(response['choices'][0]['message']['role']))
    # return Response({'query': response})
    # >>>>>>> Comment End >>>>>>

    # >>>>> Replace start >>>>>>
    letter = "Dear Hiring Manager at Google,\n\nI am writing to express my interest in the Software Development Engineer (SDE) position at your Waltham location. As an experienced Teaching Assistant at Brandeis University, I am excited to bring my technical skills and personal abilities to the development and testing of React Apps at Google.\n\nIn my previous role as a Teaching Assistant, I have gained invaluable experience in organizing and managing projects, working collaboratively with fellow team members, and providing excellent customer service to students. By working in a classroom environment, I have honed my interpersonal skills, making me a great fit for cross-functional teams at Google. I am an excellent communicator and enjoy working in a dynamic, fast-paced environment.\n\nAs for my technical background, I am proficient in utilizing React Library and have experience developing and testing web applications. Additionally, I have advanced knowledge of programming languages including HTML, CSS, JavaScript, and programming concepts such as Object-Oriented Programming, Data Structures, and Algorithm Design. \n\nFurthermore, I am familiar with Agile methodology and have experience working with various software development tools such as Git, Jira, and Postman. My passion for learning new technologies and my ability to apply it in practical settings makes me confident in my ability to excel in the SDE role at Google.\n\nI am excited about the opportunity to join Google and assist in the development and testing of React Apps. Thank you for your consideration, and I look forward to hearing back from you soon.\n\nSincerely,\n\nNan\nnanwang@brandeis.edu\n\nI'am assistant"
    return Response({'query': letter})
    # <<<<< Replace end <<<<<<
    
        
    
