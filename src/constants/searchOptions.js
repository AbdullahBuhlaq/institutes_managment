const searchOptions = {
  courses: {
    courseName: { name: "الاسم", type: "text" },
    endDate: { name: "تاريخ النهاية", type: "date" },
    startDate: { name: "تاريخ البداية", type: "date" },
    hours: { name: "عدد الساعات", type: "number" },
    leastHoursForCertificate: { name: "عدد الساعات لنيل الشهادة", type: "number" },
    leastStudentForStart: { name: "عدد الطلاب للبدء", type: "number" },
    lessonsNumber: { name: "عدد الجلسات", type: "number" },
    price: { name: "السعر", type: "number" },
    subjectId: { name: "المادة", type: "select" },
    // teachers: { name: "المعلمون", type: "array" },
  },
  discounts: {
    reason: { name: "سبب الحسم", type: "text" },
    ratio: { name: "نسبة الحسم", type: "number" },
  },
  notebooks: {
    name: { name: "اسم الدفتر", type: "text" },
    type: { name: "نوع الدفتر", type: "select" },
    to: { name: "من", type: "number" },
    from: { name: "الى", type: "number" },
  },
  rooms: {
    name: { name: "اسم القاعة", type: "text" },
    count: { name: "السعة", type: "number" },
  },
  receipts: {
    reason: { name: "سبب الحسم", type: "text" },
    ratio: { name: "نسبة الحسم", type: "number" },
  },
  payments: {
    reason: { name: "سبب الحسم", type: "text" },
    ratio: { name: "نسبة الحسم", type: "number" },
  },
  employees: {
    name: { name: "الاسم", type: "text" },
    gender: { name: "الجنس", type: "select" },
    email: { name: "البريد الإلكتروني", type: "text" },
    salary: { name: "الراتب الشهري", type: "number" },
    phone: { name: "الموبايل", type: "text" },
  },
  teachers: {
    nameAr: { name: "الاسم بالعربية", type: "text" },
    nameEn: { name: "الاسم بالإنجلزية", type: "text" },
    level: { name: "المرحلة", type: "select" },
    subjects: { name: "المواد", type: "array" },
    // بدن تزبيط
    nameBranch: { name: "اسم الفرع", type: "select" },
    //
    gender: { name: "الجنس", type: "select" },
    phone: { name: "الموبايل", type: "text" },
  },
  students: {
    nameAr: { name: "الاسم بالعربية", type: "text" },
    nameEn: { name: "الاسم بالإنجلزية", type: "text" },
    level: { name: "المرحلة", type: "select" },
    gender: { name: "الجنس", type: "select" },
    phone: { name: "الموبايل", type: "text" },
  },
  teacherCourseForm: {
    courseCount: { name: "عدد الدورات", type: "number" },
    studentsExistingRate: { name: "نسبة حضور الطلاب", type: "number" },
    highestCostRate: { name: "أعلى نسبة أجر", type: "number" },
    nameAr: { name: "الاسم", type: "text" },
    nameBranch: { name: "اسم الفرع", type: "select" },
    phone: { name: "موبايل", type: "text" },
    choosen: { name: "الاختيار", type: "select" },
  },
  institutes: {
    name: { name: "الاسم", type: "text" },
    fromHour: { name: "ساعة الافتتاح", type: "number" },
    toHour: { name: "ساعة الإغلاق", type: "number" },
    countBranch: { name: "عدد الأفرع", type: "number" },
    typeTraining: { name: "نوع المعهد", type: "select" },
  },
  branches: {
    name: { name: "الاسم", type: "text" },
    countClass: { name: "عدد القاعات", type: "number" },
    country: { name: "المدينة", type: "select" },
  },
  roles: {
    name: { name: "الاسم", type: "text" },
    permission: { name: "السماحيات", type: "array" },
    show: { name: "القراءة", type: "array" },
  },
  subjects: {
    name: { name: "الاسم", type: "text" },
    subjectType: { name: "النوع", type: "select" },
  },
};

export default searchOptions;
