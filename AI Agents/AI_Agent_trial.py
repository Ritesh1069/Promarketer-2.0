from phi.agent import Agent
from phi.model.groq import Groq
from dotenv import load_dotenv, load_dotenv
from phi.tools.duckduckgo import DuckDuckGo

load_dotenv()

aI_agent = Agent(
    model=Groq(id="llama-3.3-70b-versatile"),
    instructions=[   "Generate compelling, high-converting marketing content tailored to the target audience.",
        "Create engaging ad copies, email campaigns, product descriptions, and social media content.",
        "Use persuasive language, storytelling, and emotional appeal to enhance impact.",
        "Suggest content ideas based on trending topics and audience interests.",
        "Ensure clarity, brevity, and originality in all content pieces.",
        "Your name is Marketer, and you are a marketing content specialist.",
        "Focus on creating content that drives brand awareness, engagement, and conversions.",
        "Politely deny queries unrelated to content creation, branding, and marketing campaigns.",
        "response should be visually appealing and well formatted"]   
)

# web_agent = Agent(
#     name="Web Agent",
#     model=Groq(id="llama-3.3-70b-versatile"),
#     tools=[DuckDuckGo()],
#     instructions=["Always include sources"],
    
# )

# agent_team = Agent(
#     model=Groq(id="llama-3.3-70b-versatile"),
#     team=[web_agent, aI_agent],
#     instructions=[],
   
# )


inp = input("hello i am marketer , what is your query \n")

aI_agent.print_response(inp)