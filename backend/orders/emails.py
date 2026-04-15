"""
Transactional email helpers using Resend.
All functions are fire-and-forget — they log errors but never raise,
so a broken email config never crashes an order.
"""
import logging
import resend
from django.conf import settings

logger = logging.getLogger(__name__)


def _send(*, to: str, subject: str, html: str) -> None:
    """Low-level send wrapper. Skips silently if RESEND_API_KEY is not set."""
    if not settings.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — email skipped: %s", subject)
        return
    try:
        resend.api_key = settings.RESEND_API_KEY
        resend.Emails.send({
            "from": settings.FROM_EMAIL,
            "to": [to],
            "subject": subject,
            "html": html,
        })
    except Exception as exc:
        logger.error("Resend error (%s): %s", subject, exc)


def _base_layout(title: str, body_html: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5EFE7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#FDFBF7;border-bottom:3px solid #A68A64;padding:24px 40px;text-align:center;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;font-size:28px;color:#4A7C2C;font-family:Georgia,serif;letter-spacing:1px;">
                Page &amp; Prose
              </h1>
              <p style="margin:4px 0 0;font-size:13px;color:#6B5D4F;font-family:Arial,sans-serif;">
                Your trusted bookstore
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FDFBF7;padding:40px;border-radius:0 0 12px 12px;">
              {body_html}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;">
                Need help? Reply to this email or contact
                <a href="mailto:support@pageandprose.com" style="color:#4A7C2C;">support@pageandprose.com</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#A68A64;font-family:Arial,sans-serif;">
                &copy; Page &amp; Prose. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def send_order_confirmation(order) -> None:
    """Email sent to the customer immediately after placing an order."""
    items_html = "".join(
        f"""
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #E8DCC8;font-family:Arial,sans-serif;">
            <strong style="color:#2C2416;">{item.book.title}</strong>
            <span style="color:#6B5D4F;font-size:13px;"> by {item.book.author}</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #E8DCC8;text-align:center;color:#6B5D4F;font-family:Arial,sans-serif;">
            &times; {item.quantity}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #E8DCC8;text-align:right;color:#4A7C2C;font-family:Arial,sans-serif;font-weight:bold;">
            {round(float(item.price) * item.quantity):,} XAF
          </td>
        </tr>
        """
        for item in order.items.select_related("book").all()
    )

    body = f"""
      <h2 style="margin:0 0 8px;font-size:24px;color:#2C2416;font-family:Georgia,serif;">
        Thank you for your order, {order.customer_name.split()[0]}!
      </h2>
      <p style="margin:0 0 28px;color:#6B5D4F;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;">
        We've received your order and it's now being processed.
        We'll send you another update once it ships.
      </p>

      <!-- Order number badge -->
      <div style="background-color:#F5EFE7;border:2px solid #D4C4B0;border-radius:8px;padding:16px 24px;margin-bottom:28px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;">
          Order Number
        </p>
        <p style="margin:6px 0 0;font-size:22px;color:#4A7C2C;font-family:Georgia,serif;font-weight:bold;">
          #{order.id}
        </p>
      </div>

      <!-- Items table -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:8px;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #D4C4B0;">
              Book
            </th>
            <th style="text-align:center;padding-bottom:8px;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #D4C4B0;">
              Qty
            </th>
            <th style="text-align:right;padding-bottom:8px;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #D4C4B0;">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {items_html}
        </tbody>
      </table>

      <!-- Total -->
      <div style="text-align:right;margin-bottom:28px;">
        <span style="font-size:16px;color:#2C2416;font-family:Arial,sans-serif;">Total Paid: </span>
        <span style="font-size:20px;color:#4A7C2C;font-family:Georgia,serif;font-weight:bold;">
          {round(float(order.total_price)):,} XAF
        </span>
      </div>

      <!-- Shipping address -->
      <div style="background-color:#F5EFE7;border-left:4px solid #4A7C2C;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="margin:0 0 4px;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;">
          Delivery Address
        </p>
        <p style="margin:0;font-size:14px;color:#2C2416;font-family:Arial,sans-serif;line-height:1.6;">
          {order.shipping_address.replace(', ', '<br />')}
        </p>
      </div>

      <!-- Estimated delivery -->
      <div style="background-color:#F0F7EA;border:1px solid #C8E0B0;border-radius:8px;padding:16px 20px;margin-bottom:28px;text-align:center;">
        <p style="margin:0;font-size:14px;color:#4A7C2C;font-family:Arial,sans-serif;">
          📦 Estimated delivery: <strong>5-7 business days</strong>
        </p>
      </div>

      <p style="margin:0;color:#6B5D4F;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">
        Happy reading!<br />
        <strong style="color:#2C2416;">The Page &amp; Prose Team</strong>
      </p>
    """

    _send(
        to=order.customer_email,
        subject=f"Order Confirmed — #{order.id} | Page & Prose",
        html=_base_layout("Order Confirmed", body),
    )


def send_status_update(order) -> None:
    """Email sent when an order moves to 'shipped' or 'delivered'."""
    status_config = {
        "shipped": {
            "emoji": "🚚",
            "headline": "Your order is on its way!",
            "message": "Great news — your books have been packed and handed to our courier. "
                       "They should reach you within the next few days.",
            "badge_color": "#F59E0B",
            "badge_label": "Shipped",
        },
        "delivered": {
            "emoji": "✅",
            "headline": "Your order has been delivered!",
            "message": "We hope your new books bring you hours of joy. "
                       "If you have any issues with your order, don't hesitate to reach out.",
            "badge_color": "#4A7C2C",
            "badge_label": "Delivered",
        },
    }

    cfg = status_config.get(order.status)
    if not cfg:
        return

    body = f"""
      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-block;background-color:{cfg['badge_color']};color:#fff;
                    padding:8px 20px;border-radius:20px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">
          {cfg['emoji']} &nbsp;{cfg['badge_label']}
        </div>
      </div>

      <h2 style="margin:0 0 12px;font-size:22px;color:#2C2416;font-family:Georgia,serif;">
        {cfg['headline']}
      </h2>
      <p style="margin:0 0 28px;color:#6B5D4F;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;">
        {cfg['message']}
      </p>

      <div style="background-color:#F5EFE7;border:2px solid #D4C4B0;border-radius:8px;padding:16px 24px;margin-bottom:28px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#6B5D4F;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;">
          Order Number
        </p>
        <p style="margin:6px 0 0;font-size:22px;color:#4A7C2C;font-family:Georgia,serif;font-weight:bold;">
          #{order.id}
        </p>
      </div>

      <p style="margin:0;color:#6B5D4F;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">
        Thank you for shopping with us!<br />
        <strong style="color:#2C2416;">The Page &amp; Prose Team</strong>
      </p>
    """

    _send(
        to=order.customer_email,
        subject=f"Your order has been {order.status} — #{order.id} | Page & Prose",
        html=_base_layout(cfg["badge_label"], body),
    )


def send_test_email(to: str) -> None:
    """Sends a test email to verify Resend is configured correctly."""
    body = f"""
      <h2 style="margin:0 0 12px;font-size:22px;color:#2C2416;font-family:Georgia,serif;">
        Test Email — Everything is working!
      </h2>
      <p style="margin:0 0 20px;color:#6B5D4F;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;">
        This is a test from your Page &amp; Prose email notification system.
        If you're reading this, your Resend integration is configured correctly.
      </p>
      <div style="background-color:#F0F7EA;border:1px solid #C8E0B0;border-radius:8px;padding:16px 20px;text-align:center;">
        <p style="margin:0;font-size:14px;color:#4A7C2C;font-family:Arial,sans-serif;">
          ✅ &nbsp;Email delivery confirmed
        </p>
      </div>
    """
    _send(
        to=to,
        subject="Test Email | Page & Prose",
        html=_base_layout("Test Email", body),
    )
