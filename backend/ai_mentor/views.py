from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import ChatHistory
from .serializers import ChatHistorySerializer

class ChatMentorViewSet(viewsets.ModelViewSet):
    serializer_class = ChatHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatHistory.objects.filter(user=self.request.user).order_by('-timestamp')

    def create(self, request, *args, **kwargs):
        user_query = request.data.get('user_query')
        if not user_query:
            return Response({"error": "Query required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # AI Mentor logic (mock or real LLM)
        ai_response = self.get_ai_response(user_query)
        
        chat = ChatHistory.objects.create(
            user=request.user,
            user_query=user_query,
            ai_response=ai_response
        )
        
        return Response(ChatHistorySerializer(chat).data, status=status.HTTP_201_CREATED)

    def get_ai_response(self, query):
        # In a real app, call OpenAI/LLM API
        # For demonstration, use pre-defined responses for farming
        query = query.lower()
        if "crop" in query:
            return "For rice, ensure the soil is clayey and retains standing water. Use high-yield varieties like IR64."
        elif "pest" in query:
            return "If you see yellowing leaves, check for aphids. Use organic neem oil spray as a first measure."
        elif "fertilizer" in query:
            return "NPK 10:20:10 is generally good for most vegetables. Apply during primary growth phase."
        else:
            return "I am your AI Farming Mentor. How can I assist you with your land or crops today?"
