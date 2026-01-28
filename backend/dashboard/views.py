from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order


class DashboardStatsView(APIView):
    """
    Returns dashboard statistics for the current user
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Get order statistics
        if user.role == 'client':
            orders = Order.objects.filter(client=user)
        else:
            orders = Order.objects.all()
        
        total_orders = orders.count()
        pending_orders = orders.filter(status='pending').count()
        in_progress_orders = orders.filter(status='in_progress').count()
        completed_orders = orders.filter(status='completed').count()
        
        # Get recent orders
        recent_orders = orders.order_by('-created_at')[:5].values(
            'id', 'title', 'service_type', 'status', 'created_at'
        )
        
        return Response({
            'stats': {
                'total_orders': total_orders,
                'pending': pending_orders,
                'in_progress': in_progress_orders,
                'completed': completed_orders,
            },
            'recent_orders': list(recent_orders),
            'subscription': {
                'plan': 'Бизнес Оптимум',
                'status': 'active',
                'expires_at': '2026-02-20',
                'price': 45000,
            }
        })


class DashboardCasesView(APIView):
    """
    Returns active cases/orders for dashboard widgets
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        if user.role == 'client':
            orders = Order.objects.filter(client=user)
        else:
            orders = Order.objects.all()
        
        active_cases = orders.filter(
            status__in=['pending', 'in_progress', 'awaiting_payment']
        ).order_by('-updated_at')[:5]
        
        cases_data = [{
            'id': order.id,
            'title': order.title,
            'service_type': order.service_type,
            'service_type_display': order.get_service_type_display(),
            'status': order.status,
            'status_display': order.get_status_display(),
            'created_at': order.created_at,
            'updated_at': order.updated_at,
        } for order in active_cases]
        
        return Response({
            'cases': cases_data,
            'total_active': orders.exclude(status='completed').count()
        })


import requests
from django.conf import settings
from rest_framework import status

class CareerApplicationView(APIView):
    """
    Handles job application submissions and sends them to Telegram
    """
    permission_classes = [permissions.AllowAny]  # Public endpoint

    def post(self, request):
        data = request.data
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        vacancy = data.get('vacancy')
        link = data.get('link', '')
        
        if not all([name, phone, email, vacancy]):
            return Response(
                {'error': 'Пожалуйста, заполните все обязательные поля'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Format message
        message = (
            f"⚡️ <b>Новый отклик на вакансию!</b>\n\n"
            f"💼 <b>Вакансия:</b> {vacancy}\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Телефон:</b> {phone}\n"
            f"📧 <b>Email:</b> {email}\n"
        )
        
        if link:
            message += f"🔗 <b>Ссылка/Резюме:</b> {link}\n"
            
        # Send to Telegram
        try:
            bot_token = settings.TELEGRAM_BOT_TOKEN
            chat_id = settings.TELEGRAM_CHAT_ID
            
            if not bot_token or bot_token == 'your_bot_token':
                # Log error or dummy success for dev
                print("Telegram token not configured")
                return Response({'success': True, 'warning': 'Telegram not configured'}, status=status.HTTP_200_OK)

            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            payload = {
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }
            
            response = requests.post(url, json=payload)
            response.raise_for_status()
            
            return Response({'success': True}, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error sending to Telegram: {e}")
            return Response(
                {'error': 'Ошибка при отправке заявки. Попробуйте позже.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
