class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("the stack is empty.")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("the stack is empty.")
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0


stack = Stack()

for letter in "AMITABH":
    stack.push(letter)

print(f"Original stack: {stack.items}")
print(f"Top item: {stack.peek()}")

reversed_letters = []
while not stack.is_empty():
    reversed_letters.append(stack.pop())

print(f"Empty stack: {stack.items}")
print(f"Reversed name: {''.join(reversed_letters)}")

try:
    stack.pop()
except IndexError as error:
    print(f"Cannot pop: {error}")
