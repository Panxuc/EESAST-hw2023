from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Operation(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = []
    ADD: _ClassVar[Operation]
    SUB: _ClassVar[Operation]
    PRODUCT: _ClassVar[Operation]
    DIVIDE: _ClassVar[Operation]
ADD: Operation
SUB: Operation
PRODUCT: Operation
DIVIDE: Operation

class Request(_message.Message):
    __slots__ = ["num1", "num2", "op"]
    NUM1_FIELD_NUMBER: _ClassVar[int]
    NUM2_FIELD_NUMBER: _ClassVar[int]
    OP_FIELD_NUMBER: _ClassVar[int]
    num1: int
    num2: int
    op: Operation
    def __init__(self, num1: _Optional[int] = ..., num2: _Optional[int] = ..., op: _Optional[_Union[Operation, str]] = ...) -> None: ...

class Reply(_message.Message):
    __slots__ = ["result"]
    RESULT_FIELD_NUMBER: _ClassVar[int]
    result: int
    def __init__(self, result: _Optional[int] = ...) -> None: ...
