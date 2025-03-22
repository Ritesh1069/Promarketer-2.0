import re

def add_country_code(phone_number):
    # Regular expression to match phone numbers with or without country code
    pattern = r'^(\+91)?(\d{10})$'
    match = re.match(pattern, phone_number)
    
    if match:
        # If country code is not present, add it
        if match.group(1) is None:
            return '+91' + match.group(2)
        else:
            return phone_number  # Country code already present
    else:
        return False  # Invalid phone number format

