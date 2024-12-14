import csv
import json

def sanitize_name(name):
    try:
        # Decode any utf-8 encoded unicode characters
        name = name.encode('latin1').decode('utf-8')
    except:
        pass
    
    # Remove commas and extra spaces
    name = name.replace(',', '').strip()
    
    # Replace sequences of spaces with a single space
    name = ' '.join(name.split())
    
    return name

data_list = []

with open('furnitures.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for index, row in enumerate(reader):
        name = sanitize_name(row[0])
        data = {
            "id": index + 1,
            "name": name,
            "size": row[1]
        }
        data_list.append(data)

with open('furnitures.json', 'w', encoding='utf-8') as jf:
    json.dump(data_list, jf, ensure_ascii=False, indent=4)
