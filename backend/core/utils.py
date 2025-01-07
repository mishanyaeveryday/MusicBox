from django.core.mail import send_mail
from django.conf import settings


def send_otp(email, otp):
    """
    Send OTP via Email.
    """
    subject = "Your Code"
    message = f"""
    Hello,

    Your code is: {otp}

    If you did not request this, please ignore this email.

    Best regards,
    The PeachNote Team
    """
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    try:
        send_mail(subject, message, from_email,
                  recipient_list, fail_silently=False)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


def send_info_about_created_account(email, username):
    """
    Notify user about successful account creation.
    """
    subject = "Welcome to PeachNote!"
    message = f"""
    Hello {username},

    Thank you for signing up at PeachNote!

    If you did not register on our platform, please disregard this email.

    Best regards,
    The PeachNote Team
    """
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    try:
        send_mail(subject, message, from_email,
                  recipient_list, fail_silently=False)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
