# # import pandas as pd
# # from sklearn.linear_model import LinearRegression
# # import pickle
# # import os

# # # Get absolute CSV path
# # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# # csv_path = os.path.join(BASE_DIR, 'laptop.csv')

# # # Load dataset
# # df = pd.read_csv(csv_path)

# # # Features and target (adjust columns to your CSV)
# # X = df[['Laptop', 'Status', 'Brand', 'Model','CPU','RAM','Storage','Storage type','GPU','Screen','Touch']]
# # y = df['Final Price']

# # # Train model
# # model = LinearRegression()
# # model.fit(X, y)

# # # Save model
# # model_path = os.path.join(BASE_DIR, 'devices', 'ml_model', 'model.pkl')
# # with open(model_path, 'wb') as f:
# #     pickle.dump(model, f)

# # print("✅ Model trained and saved as model.pkl")



# import pandas as pd
# from sklearn.linear_model import LinearRegression
# import pickle
# import os

# # Get path to laptop.csv (corrected location)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # this is /backend
# csv_path = os.path.join(BASE_DIR, 'laptop.csv')  # <- Correct!

# # Load and preview CSV
# df = pd.read_csv(csv_path, encoding='ISO-8859-1')  # use encoding only if needed
# df.columns = df.columns.str.strip()
# X = df[['Inches','Ram',]]
# y = df['Price_euros']

# model = LinearRegression()
# model.fit(X, y)

# # Save model to devices/ml_model/model.pkl
# model_path = os.path.join(BASE_DIR, 'devices', 'ml_model', 'model.pkl')
# with open(model_path, 'wb') as f:
#     pickle.dump(model, f)

# print("✅ Model trained and saved as model.pkl")


import pandas as pd
import re
from sklearn.linear_model import LinearRegression
import pickle
import os

# Setup path to laptop.csv
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(BASE_DIR, 'laptop.csv')

# Load the dataset
df = pd.read_csv(csv_path, encoding='ISO-8859-1')

# ✅ Use exact column names: 'Ram', 'Memory', 'Price_euros'
# --- Convert 'Ram' like "8GB", "16GB" → 8, 16
def convert_ram(ram_str):
    try:
        return int(re.sub(r'\D', '', ram_str))  # remove non-digit characters
    except:
        return None

df['ram_num'] = df['Ram'].apply(convert_ram)

# --- Convert 'Memory' like "1TB + 128GB SSD" → total in GB
def convert_memory(mem_str):
    if not isinstance(mem_str, str):
        return None
    mem_str = mem_str.upper()
    parts = re.findall(r'(\d+)(GB|TB)', mem_str)
    total = 0
    for amount, unit in parts:
        amount = int(amount)
        if unit == 'TB':
            amount *= 1024
        total += amount
    return total

df['storage_num'] = df['Memory'].apply(convert_memory)

# --- Convert Price_euros to numeric
df['price'] = pd.to_numeric(df['Price_euros'], errors='coerce')

# Drop missing data
df = df.dropna(subset=['ram_num', 'storage_num', 'price'])

# Prepare features and label
X = df[['ram_num', 'storage_num']]
y = df['price']

# Train the model
model = LinearRegression()
model.fit(X, y)

# Save the trained model
# model_path = os.path.join(BASE_DIR, 'devices', 'ml_model', 'model.pkl')
# with open(model_path, 'wb') as f:
#     pickle.dump(model, f)

# print("✅ Model trained successfully and saved to model.pkl")

# Save the trained model
model_dir = os.path.join(BASE_DIR, 'devices', 'ml_model')
os.makedirs(model_dir, exist_ok=True)  # ✅ Create if it doesn't exist

model_path = os.path.join(model_dir, 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print("✅ Model trained successfully and saved to model.pkl")
