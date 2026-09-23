class Stack:
    EMPTY_STACK_ERROR = "the stack is empty."

    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError(self.EMPTY_STACK_ERROR)
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError(self.EMPTY_STACK_ERROR)
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def __repr__(self):
        return str(self._items)


def main():
    stack = Stack()

    for letter in "AMITABH":
        stack.push(letter)

    print(f"Original stack: {stack}")
    print(f"Top item: {stack.peek()}")

    reversed_letters = []
    while not stack.is_empty():
        reversed_letters.append(stack.pop())

    print(f"Empty stack: {stack}")
    print(f"Reversed name: {''.join(reversed_letters)}")

    try:
        stack.pop()
    except IndexError as error:
        print(f"Cannot pop: {error}")


if __name__ == "__main__":
    main()
