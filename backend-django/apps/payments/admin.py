from django.contrib import admin
from .models import Payment
from .services import TinkoffPaymentService
from django.contrib import messages

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'status', 'created_at', 'payment_id')
    list_filter = ('status', 'created_at')
    search_fields = ('user__email', 'order_id', 'payment_id')
    actions = ['check_status_action', 'cancel_payment_action']
    
    @admin.action(description='Check Status in T-Bank')
    def check_status_action(self, request, queryset):
        for payment in queryset:
            if not payment.payment_id:
                continue
            try:
                res = TinkoffPaymentService.check_status(payment.payment_id)
                self.message_user(request, f"Payment {payment.id}: {res.get('Status')} - {res.get('Message')}", messages.INFO)
            except Exception as e:
                self.message_user(request, f"Payment {payment.id} Error: {str(e)}", messages.ERROR)

    @admin.action(description='CANCEL/REFUND Payment in T-Bank')
    def cancel_payment_action(self, request, queryset):
        for payment in queryset:
            if not payment.payment_id:
                continue
            try:
                res = TinkoffPaymentService.cancel_payment(payment.payment_id)
                if res.get('Success'):
                     self.message_user(request, f"Payment {payment.id} Cancelled: {res.get('Status')}", messages.SUCCESS)
                     # Optionally update local status
                     payment.status = 'CANCELED'
                     payment.save()
                else:
                     self.message_user(request, f"Payment {payment.id} Cancel Failed: {res.get('Message')} ({res.get('Details')})", messages.ERROR)
            except Exception as e:
                self.message_user(request, f"Payment {payment.id} Error: {str(e)}", messages.ERROR)
