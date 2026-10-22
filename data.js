// 문제 데이터: pool = 출처 PDF, q = 문제, img = 문제 이미지, a = 정답(HTML), aimg = 정답 이미지
window.QUESTIONS = [
{id:"1-1",pool:"POOL 1",n:1,q:"리눅스에서 CPU 스케줄러가 CPU를 배분하는 대상의 단위는 무엇인가?",a:"프로세스(정확히 말하면 쓰레드)"},
{id:"1-2",pool:"POOL 1",n:2,q:"아래 그림에서 (1) 이 프로그램 명령어(어셈블리어 명령어) 부분, (2) global 이라는 변수, local 이라는 변수, dynamic 이라는 변수는 오른쪽의 가상메모리 영역 부분 중 어디 들어 있는지 각각 쓰시오.",img:["a1-000"],a:"- 명령어(코드): <b>text</b><br>- global 변수: <b>data</b><br>- local 변수: <b>stack</b><br>- dynamic(malloc): <b>heap</b>"},
{id:"1-3",pool:"POOL 1",n:3,q:"2번의 그림에서 3GB~4GB까지는 커널 코드이다. 이 처럼 각 응용프로세스의 가상메모리에 커널 코드가 들어있어야 하는 이유는 무엇인가?",img:["a1-000"],a:"그 응용프로세스가 동작할 때 커널의 도움(예, 시스템 콜)이 필요하기 때문"},
{id:"1-4",pool:"POOL 1",n:4,q:"만약 한 프로세스에 쓰레드 두 개가 동시에 돌아가고 있다고 하자. 그러면 2번의 그림에서 두 쓰레드가 공유하는 부분은 어디이고 따로 사용해야 하는 부분은 어디인가? 그리고 그 이유는 무엇인가?",img:["a1-001"],a:"- 공유: <b>Code, Data, Heap</b><br>- 따로 사용: <b>Stack, Register</b><br>- 이유: 쓰레드마다 독립적인 실행 흐름(함수 호출·지역변수·현재 실행 위치)을 가져야 하므로 stack과 레지스터는 개별로 필요하고, 같은 프로세스의 코드/전역 데이터/동적 메모리는 공유해 통신과 생성 비용을 줄인다. <small>(※ PDF에 해답 없음 – 그림 기준 정리)</small>"},
{id:"1-5",pool:"POOL 1",n:5,q:"옆의 그림을 참고하여 COW 버전의 fork()가 어떻게 동작하는지 설명하시오.",img:["a1-002"],a:"부모와 페이지테이블을 공유하다가, 메모리에 write 할 때에 새로운 페이지를 물리메모리에 할당하고 데이터를 copy 한다. 이후 그 페이지에 해당하는 페이지테이블을 업데이트 한다."},
{id:"1-6",pool:"POOL 1",n:6,q:"아래 프로그램을 실행하면 결과가 어떻게 나올지 빈칸을 채워보시오.",img:["a1-003"],a:"실행 결과:",aimg:["a1-004"]},
{id:"1-7",pool:"POOL 1",n:7,q:"아래 프로그램을 실행하면 결과가 어떻게 나올지 빈칸을 채워보시오.",img:["a1-005"],a:"실행 결과:",aimg:["a1-007"]},
{id:"1-8",pool:"POOL 1",n:8,q:"커널이 관리하는 하드웨어 문맥은 무엇이고, 이를 유지해야 하는 이유는 무엇인지 아래 그림을 예로 하여 설명하시오.",img:["a1-006"],a:"- HW 문맥(HW context)란 그 프로세스(쓰레드)가 사용하고 있는 cpu 레지스터 값들을 의미<br>- 다른 프로세스로 CPU가 넘어갈 때 기존 프로세스에서 사용하던 cpu 레지스터의 값들(HW 문맥)이 task_struct의 tss 에 저장되고, 앞으로 cpu를 사용할 프로세스를 위해 그 프로세스의 tss에 저장된 cpu레지스터 값들을 실제 cpu 레지스터에 복구한 후 사용해야 함.",aimg:["a1-008","a1-009"]},

{id:"2-1",pool:"POOL 2",n:1,q:"아래 그림의 각 상태에 대해서 간단히 설명하시오.",img:["a2-000"],a:"<b>TASK_RUNNING(running) ⇒ (ready)</b><br>할당된 CPU 시간을 모두 사용했거나, 더 높은 우선순위 태스크에게 밀려 ready 상태로 전환.<br><br><b>TASK_STOPPED, TASK_TRACED</b><br>SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU 등의 시그널을 받으면 TASK_STOPPED. 이후 SIGCONT를 받아 다시 ready. 디버거의 ptrace()로 디버깅 중인 태스크가 시그널을 받으면 TASK_TRACED.<br><br><b>TASK_INTERRUPTIBLE / UNINTERRUPTIBLE / KILLABLE</b><br>running 태스크가 특정 사건(디스크 등 주변장치 요청 완료, 자원 대기 등)을 기다릴 때 대기 상태로 전이.<br>- UNINTERRUPTIBLE: 사건을 기다리지만 시그널에 반응하지 않음.<br>- KILLABLE: UNINTERRUPTIBLE이라 kill -9로도 안 죽는 문제를 해결. SIGKILL 같은 fatal signal에만 반응.<br><br><b>TASK_DEAD</b><br>exit() 호출(또는 kill)되면 TASK_DEAD(EXIT_ZOMBIE)로 전이.<br>- EXIT_ZOMBIE: 자원 대부분을 커널에 반납했지만, 종료 사유(에러 번호)·자원 사용 통계를 부모에게 알려주기 위해 유지.<br>- 부모가 wait()를 호출하면 EXIT_DEAD로 바뀌고 부모가 종료 정보를 넘겨받음. 이후 남은 자원을 모두 반환하고 종료."},
{id:"2-2",pool:"POOL 2",n:2,q:"아래 그림의 네모 친 부분에서 shell 과 ls 의 상태는 무엇인지 1번의 그림을 참고하여 각각 쓰시오.",img:["a2-001"],a:"- shell: TASK_INTERRUPTIBLE 또는 TASK_UNINTERRUPTIBLE 또는 TASK_KILLABLE (wait 중인 대기 상태)<br>- ls: TASK_RUNNING(running) ⇒ TASK_RUNNING(ready)"},
{id:"2-3",pool:"POOL 2",n:3,q:"CPU가 커널을 동작시킬 때는 kernel level(supervisor mode)로 수행된다. CPU의 user level 수행과 kernel level 수행의 차이를 간단히 쓰라.",a:"- user level running: 응용프로그램이나 라이브러리 함수를 수행하고 있는 상태<br>- kernel level running: 커널 프로그램의 일부분을 수행하고 있는 상태. 사용자 수준 권한에서는 접근이 금지된 커널 내부 자료구조에 접근하거나 금지된 특권 명령어를 수행할 수 있다."},
{id:"2-4",pool:"POOL 2",n:4,q:"CPU는 언제 user level 수행에서 kernel level 로 전이 되는가? 두 가지를 쓰시오.",a:"- 시스템 콜<br>- 인터럽트 발생"},
{id:"2-5a",pool:"POOL 2",n:5,q:"[5-(1)] 아래 thread union 구조체는 가상 메모리의 어느 부분에 생성되는가?",img:["a2-002"],a:"운영체제 공간(커널 영역)"},
{id:"2-5b",pool:"POOL 2",n:5,q:"[5-(2)] thread union 구조체의 크기는 얼마인가?",a:"8KB"},
{id:"2-5c",pool:"POOL 2",n:5,q:"[5-(3)] 가상 메모리 공간에도 stack이 있다. 그러면 thread union의 stack은 왜 필요한지 설명하라.",a:"그 프로세스가 수행도중에 운영체제 코드로 들어왔을 때, 운영체제가 사용하는 공간(커널 스택)"},
{id:"2-5d",pool:"POOL 2",n:5,q:"[5-(4)] thread union의 pt_regs 와 task_struct의 H/W context(tss)는 모두 CPU의 레지스터들을 저장하는 공간이다. 각각에 저장되는 레지스터의 내용은 어떻게 다른가?",a:"- <b>pt_regs</b>: 사용자 context에서 운영체제 context로 넘어갈 때, 사용자 context의 레지스터가 저장되는 공간<br>- <b>task_struct의 tss</b>: 운영체제 내에서 다른 프로세스를 위한 운영체제로 context switch 가 일어날 때, 이전 프로세스를 위한 운영체제가 사용하던 레지스터 값들을 저장하는 공간. 이후 새 프로세스의 tss에서 값들이 복구되어 cpu 레지스터에 복사됨."},
{id:"2-6",pool:"POOL 2",n:6,q:"cpu가 kernel level 수행에서 user level 수행으로 전이할 때, 커널이 수행하는 일 두 가지를 쓰시오.",a:"- 현재 실행중인 태스크가 시그널을 받았는지 확인하며, 받았다면 필요한 경우에 한해 시그널 처리 핸들러를 호출<br>- 다시 스케줄링 해야 할 필요가 있다면(need_resched 플래그가 1로 설정된 경우) 스케줄러를 호출"},

{id:"3-1",pool:"POOL 3",n:1,q:"다중 CPU 또는 멀티 코어 환경에서는 새로 생성된 태스크는 부모태스크가 존재하던 런큐에 삽입되고, 대기상태에서 깨어난 태스크는 대기전에 수행되던 CPU의 런큐에 삽입된다. 이유가 무엇인지 설명하라.",a:"캐시 친화력(cache affinity)을 얻을 수 있기 때문"},
{id:"3-2",pool:"POOL 3",n:2,q:"스케줄러는 언제 호출되어 수행되는지 두 가지만 써보시오.",a:"- 수행 중이던 태스크가 자신의 타임 슬라이스를 다 썼거나 대기 상태로 전환<br>- 현재 태스크보다 높은 우선순위를 가진 태스크가 깨어난 경우<br>- 스케줄링 관련 시스템 콜 호출<br><small>(이 중 두 가지)</small>",aimg:["a3-001"]},
{id:"3-3",pool:"POOL 3",n:3,q:"O(1) 스케쥴러에서 비트맵의 역할은 무엇인가?",a:"K번째 비트 값이 1로 되어 있다면 우선순위 K인 프로세스가 하나 이상 cpu사용을 위해 대기 상태에 있음을 의미함"},
{id:"3-4a",pool:"POOL 3",n:4,q:"[4-(1)] 프로세스가 interactive 한지 커널은 어떻게 알 수 있는가?",a:"running 상태에서 ready 상태로 가는 게 아니라, event wait 상태로 가는 경우가 많음. 즉 event wait 상태에서 기다리는 시간이 평균 이상임."},
{id:"3-4b",pool:"POOL 3",n:4,q:"[4-(2)] interactive 한 프로세스는 커널이 우선순위를 어떻게 조정하는가? (이유도 설명)",a:"우선순위를 높여서 time slice를 크게 준다. 이렇게 줘도 스스로 반납하고 event wait 상태로 간다."},
{id:"3-5",pool:"POOL 3",n:5,q:"O(1)스케쥴러에서 nice값 20(timeslice는 5ms)을 가지는 두 개의 태스크가 실행된다고 가정하자. 컨텍스트 스위칭은 5ms 간격으로 발생 할 것이다. 프로세스가 1000ms 동안 실행 된다고 가정 할 경우, 과연 올바른 스케줄링 동작인지 이유와 함께 설명하고, 그렇다면 제대로된 스케줄링 동작은 무엇인지 간단히 써보라.",a:"올바르지 않다. context switch가 너무 자주 발생한다. nice 값이 절대적인 timeslice 값을 결정하기 때문에 어쩔 수 없이 나타나는 것이다. 적당하게 100ms 정도로 time slice를 사용하면서 두 프로세스가 cpu를 사용하면 context switch도 자주 되지 않으면서, 프로세스가 끝나는 시간도 비슷하게 나올 수 있다(100ms 차이). 이는 현재 cpu ready 상태에 있는 프로세스들의 우선순위를 파악하여 상대적인 timeslice 값을 결정할 수 있다면 해결 할 수 있다."},
{id:"3-6",pool:"POOL 3",n:6,q:"CFS에서는 우선순위에 따라 time slice를 아래와 같이 계산하여 배분한다. 이렇게 하면 위의 5번의 문제가 해결될 수 있는가? 이유와 함께 설명하라.",img:["a3-000"],a:"해결된다. time slice를 우선순위에 따라 고정하지 않고, 현재 cpu ready 상태에 있는 프로세스들만의 우선순위(weight 비율)를 파악하여 상대적인 timeslice 값을 결정하기 때문."},
{id:"3-7",pool:"POOL 3",n:7,q:"아래 그림은 리눅스에서 Task A ---> Task B로의 문맥 교환 과정을 보여준다. 이 그림을 보고 이 문맥 교환 과정을 아는대로 설명해보라.",img:["a3-002"],a:"1. Task A의 사용자 context에서 Task A를 위한 운영체제 context로 넘어감. 이때 thread union의 pt_regs에 사용자 context의 레지스터가 저장됨.<br>2. Task A용 운영체제 context에서 Task B용 운영체제 context로 context switch. 이때 task_struct의 thread_struct(tss)에 Task A용 운영체제가 사용하던 레지스터 값들을 저장.<br>3. Task B의 tss에서 Task B용 운영체제가 사용하던 레지스터 값들이 복구되어 cpu 레지스터에 복사되고, Task B용 운영체제 코드가 실행됨.<br>4. Task B용 운영체제 코드가 종료되면 Task B의 thread union pt_regs로부터 사용자 context를 복구하여 Task B의 사용자 코드가 수행됨."}
];

// 객관식 보기: opts[0]이 정답 (화면에서 섞음)
window.MC = {
"1-1":["프로세스(정확히는 쓰레드)","파일","메모리 페이지","시스템 콜"],
"1-3":["응용프로세스 동작 중 커널의 도움(시스템 콜 등)이 필요하기 때문","커널 코드를 사용자가 직접 수정하게 하려고","메모리 용량을 늘리려고","프로세스 간 데이터를 공유하려고"],
"2-2":["shell: TASK_INTERRUPTIBLE/UNINTERRUPTIBLE/KILLABLE, ls: TASK_RUNNING(running→ready)","shell: TASK_RUNNING(ready), ls: TASK_STOPPED","shell: TASK_DEAD, ls: TASK_RUNNING(running)","shell: TASK_STOPPED, ls: TASK_KILLABLE"],
"2-5a":["운영체제(커널) 공간","user 영역의 heap","user 영역의 stack","user 영역의 data"],
"2-5b":["8KB","4KB","16KB","1MB"],
"2-5c":["프로세스가 운영체제 코드로 들어왔을 때 커널이 사용하는 공간","사용자 프로그램의 지역변수 저장","malloc으로 할당한 동적 메모리 저장","프로그램 명령어 저장"],
"3-1":["캐시 친화력(cache affinity)을 얻기 위해","메모리를 절약하기 위해","런큐 락을 없애기 위해","우선순위를 올리기 위해"],
"3-3":["K번 비트가 1이면 우선순위 K인 대기 프로세스가 하나 이상 있음을 나타낸다","프로세스의 nice 값을 저장한다","프로세스의 메모리 사용량을 나타낸다","프로세스의 CPU 사용 시간을 누적한다"],
"3-4a":["running→ready보다 event wait 상태로 가는 경우가 많고 wait 시간이 평균 이상","CPU를 오래 점유하며 time slice를 다 씀","메모리를 많이 사용함","자식 프로세스를 많이 생성함"],
"3-4b":["우선순위를 높여 time slice를 크게 준다","우선순위를 낮춰 time slice를 줄인다","ready 큐에서 제거한다","kill 시킨다"]
};
// 입력 답안 채점 힌트용 키워드 (모두 포함하면 '키워드 일치')
window.KW = {
"1-2":["text","data","stack","heap"],
"1-4":["code","data","heap","stack","register"],
"1-5":["write","페이지","copy"],
"2-4":["시스템 콜","인터럽트"],
"2-5d":["pt_regs","tss","context switch"],
"2-6":["시그널","need_resched","스케줄러"],
"3-2":["타임 슬라이스","우선순위"],
"3-6":["상대","ready"],
"3-7":["pt_regs","tss","복구"]
};

Object.assign(window.MC, {
"1-2":["명령어: text / global: data / local: stack / dynamic: heap","명령어: data / global: text / local: heap / dynamic: stack","명령어: text / global: stack / local: data / dynamic: heap","명령어: heap / global: data / local: stack / dynamic: text"],
"1-4":["공유: Code, Data, Heap / 개별: Stack, Register","공유: Stack, Register / 개별: Code, Data, Heap","공유: Code, Stack / 개별: Data, Heap, Register","전부 공유한다"],
"1-5":["부모와 페이지테이블을 공유하다가 write 시 새 물리 페이지를 할당·복사하고 페이지테이블을 갱신한다","fork 즉시 부모의 모든 물리 메모리를 복사한다","자식은 메모리를 전혀 갖지 않고 부모가 끝날 때까지 기다린다","write 시 부모의 페이지를 삭제하고 자식이 가져간다"],
"1-6":["before fork / (Parent: TGID·PID 17560) / (Child: TGID·PID 17561) / after fork가 두 번 출력 (부모·자식 각각)","before fork가 두 번 출력되고 Parent만 출력","Child만 출력되고 after fork는 한 번","fork error 출력"],
"1-7":["Parent(17750/17750), Child(TGID 17750, PID 17752), Child(TGID·PID 17751), after clone","Parent와 Child 둘 다 TGID가 서로 다르다","Child가 출력되지 않고 after clone만 출력","두 Child 모두 TGID가 17750이다"],
"1-8":["HW 문맥은 프로세스가 쓰던 CPU 레지스터 값들이며, 전환 시 tss에 저장하고 다음 프로세스의 값을 복구하기 위해 유지한다","HW 문맥은 디스크의 파일 목록이며 부팅 시 필요하다","HW 문맥은 가상메모리의 heap 영역이다","HW 문맥은 페이지테이블이며 전환 때 삭제된다"],
"2-1":["TASK_KILLABLE: UNINTERRUPTIBLE이라 kill -9로 안 죽는 문제를 해결, fatal signal(SIGKILL)에만 반응","TASK_KILLABLE: 모든 시그널에 반응하는 대기 상태","TASK_STOPPED: exit() 호출 후 부모의 wait()를 기다리는 상태","EXIT_ZOMBIE: 모든 자원을 유지한 채 실행 중인 상태"],
"2-3":["user level: 응용/라이브러리 수행. kernel level: 커널 수행, 특권 명령어·커널 자료구조 접근 가능","user level이 특권 명령어를 수행할 수 있다","kernel level은 응용프로그램만 실행한다","둘은 권한 차이가 없다"],
"2-4":["시스템 콜, 인터럽트 발생","malloc 호출, 변수 선언","함수 호출, return","fork 호출, 파일 닫기 호출 (일반 함수)"],
"2-5d":["pt_regs: 사용자→커널 전환 시 사용자 context 레지스터 / tss: 프로세스 간 커널 context switch 시 이전 커널 레지스터","pt_regs: 프로세스 간 context switch 시 레지스터 / tss: 사용자→커널 전환 시 레지스터","둘 다 사용자 context 레지스터를 저장한다","둘 다 같은 내용을 중복 저장한다"],
"2-6":["시그널 수신 확인 후 핸들러 호출, need_resched가 1이면 스케줄러 호출","메모리 전체를 디스크로 swap out, 프로세스 종료","페이지테이블 삭제, 파일 닫기","아무 일도 하지 않는다"],
"3-2":["타임 슬라이스 소진 또는 대기 상태 전환 / 더 높은 우선순위 태스크가 깨어남 / 스케줄링 관련 시스템 콜","malloc 호출 시, 변수 선언 시","printf 호출 시, 파일 열기 시","부팅할 때만"],
"3-5":["올바르지 않다. 5ms마다 문맥교환이 너무 잦으며, ready 프로세스들의 상대적 우선순위로 timeslice(예: 100ms)를 정해야 한다","올바르다. 5ms 문맥교환이 가장 효율적이다","올바르다. nice가 같으면 항상 5ms가 최적이다","올바르지 않다. timeslice를 더 줄여야 한다"],
"3-6":["해결된다. ready 상태 프로세스들의 weight 비율로 상대적 time slice를 정하므로","해결되지 않는다. CFS도 nice로 고정 time slice를 쓴다","해결된다. CFS는 time slice를 항상 5ms로 고정하기 때문","해결되지 않는다. CFS는 우선순위를 사용하지 않는다"],
"3-7":["pt_regs에 사용자 레지스터 저장 → A의 tss에 커널 레지스터 저장 → B의 tss에서 복구 → B의 pt_regs로 사용자 context 복구","B의 tss 저장 → A의 pt_regs 복구 → A의 사용자 코드 실행","pt_regs 없이 tss만 사용하고 사용자 context는 저장하지 않는다","A의 heap을 B에 복사한 뒤 A를 종료한다"]
});

// 빠른 보기용 핵심 키워드 (정답 텍스트 안의 구절, 배경 색칠)
window.KEY = {
"1-1":["프로세스","쓰레드"],
"1-2":["text","data","stack","heap"],
"1-3":["커널의 도움","시스템 콜"],
"1-4":["Code, Data, Heap","Stack, Register","독립적인 실행 흐름"],
"1-5":["페이지테이블을 공유","write 할 때","새로운 페이지를 물리메모리에 할당","copy","페이지테이블을 업데이트"],
"1-8":["cpu 레지스터 값들","tss","복구"],
"2-1":["시그널에 반응하지 않음","kill -9","fatal signal","SIGCONT","ptrace()","EXIT_ZOMBIE","wait()"],
"2-2":["TASK_INTERRUPTIBLE","TASK_RUNNING(running)","TASK_RUNNING(ready)"],
"2-3":["특권 명령어","커널 내부 자료구조","응용프로그램"],
"2-4":["시스템 콜","인터럽트 발생"],
"2-5a":["운영체제 공간"],
"2-5b":["8KB"],
"2-5c":["운영체제가 사용하는 공간","커널 스택"],
"2-5d":["pt_regs","tss","사용자 context","context switch"],
"2-6":["시그널","need_resched","스케줄러를 호출"],
"3-1":["캐시 친화력"],
"3-2":["타임 슬라이스","높은 우선순위","시스템 콜"],
"3-3":["K번째 비트","우선순위 K"],
"3-4a":["event wait","평균 이상"],
"3-4b":["우선순위를 높여","time slice를 크게"],
"3-5":["context switch가 너무 자주","상대적인 timeslice","100ms"],
"3-6":["상대적인 timeslice","ready 상태","weight"],
"3-7":["pt_regs","tss","복구","사용자 context"]
};

// 빠른 보기용 해설 (접기/펼치기)
window.EXP = {
"1-6":`<b>핵심: fork() 한 번 → 그 다음 줄부터 부모·자식이 각각 실행</b><br>
1. <b>before fork</b>는 fork() 전이라 <b>부모만</b> 한 번 출력.<br>
2. fork() 반환값: 자식은 <b>0</b>, 부모는 <b>자식의 PID(양수)</b>, 실패 시 -1(→ fork error).<br>
3. 자식(pid==0) → <code>Child</code> 출력 / 부모(else) → <code>Parent</code> 출력 후 sleep(2).<br>
4. if/else가 끝난 뒤의 <b>after fork는 부모·자식 둘 다</b> 실행하므로 <b>2번</b> 출력.<br>
5. 출력 값: <code>getpid()</code>는 TGID, <code>gettid</code> 시스템콜은 커널의 PID(스레드 ID). 쓰레드가 하나뿐인 프로세스라 <b>TGID = PID</b>. 부모 17560, 자식 17561처럼 자식 번호가 더 크다.<br>
<small>※ Parent/Child 출력 순서는 스케줄링에 따라 바뀔 수 있음. 부모가 sleep(2)하므로 자식이 먼저 끝난다.</small>`,
"1-7":`<b>핵심: clone()의 flags에 따라 "프로세스처럼" 또는 "쓰레드처럼" 만들어진다</b><br>
1. 부모: <b>before clone</b> + <code>Parent</code> (TGID = PID = 17750, 쓰레드 1개짜리 프로세스).<br>
2. <b>첫 번째 clone</b> (CLONE_CHILD_CLEARTID | CLONE_CHILD_SETTID): CLONE_VM·CLONE_THREAD가 없음 → 메모리를 공유하지 않는 <b>새 프로세스</b>. 새 TGID가 생겨 <b>TGID = PID = 17751</b>.<br>
3. <b>두 번째 clone</b> (CLONE_VM | CLONE_THREAD | CLONE_SIGHAND): 부모와 메모리·시그널 핸들러 공유, <b>같은 쓰레드 그룹</b> → <b>TGID는 부모와 같은 17750</b>, PID(스레드 ID)만 새로 <b>17752</b>.<br>
4. 그래서 Child 출력은 <code>TGID(17750), PID(17752)</code>와 <code>TGID(17751), PID(17751)</code> 두 줄.<br>
5. 자식들은 출력 직후 sleep(2), 부모는 sleep(1) 후 <b>after clone</b> 출력하고 종료.<br>
6. 스택 주소에 <code>+4095</code>를 주는 이유: 스택이 <b>높은 주소에서 낮은 주소로 자라므로</b> 배열의 끝(맨 위)을 넘겨야 한다.<br>
<small>※ PID 번호는 실행마다 다르다. 규칙(TGID가 같은지/다른지)이 핵심.</small>`
};

window.EXP["2-1"] = `<b>한 줄 요약: 태스크의 한살이에서 화살표 5개만 외운다</b><br>
<b>① 식당 비유</b><br>
- ready = 대기줄 / running = 테이블에서 식사 중(CPU 사용)<br>
- 대기 3종 = 주문한 음식 기다림 / STOPPED·TRACED = "잠깐 멈춰요!"·감시 중<br>
- ZOMBIE = 식사는 끝났는데 계산서를 아직 안 받아 간 상태<br><br>
<b>② 화살표 5개</b><br>
1. <code>fork</code> → ready (태어나자마자 줄 섬)<br>
2. ready ⇄ running: <code>schedule</code>(뽑힘), <code>preempt</code>(시간 끝 / 높은 우선순위에 밀림)<br>
3. running → 대기: <code>event wait</code>, <code>event occur</code>되면 → ready<br>
4. running → STOPPED/TRACED: <code>signal</code>, 시그널(SIGCONT)로 → ready<br>
5. running → DEAD(ZOMBIE): <code>exit</code>, 부모가 <code>wait()</code> 하면 → DEAD(EXIT_DEAD)<br><br>
<b>③ 대기 3종 구분</b><br>
- INTERRUPTIBLE: 시그널에 반응 (기본 대기)<br>
- UNINTERRUPTIBLE: 시그널에 반응 안 함 (Un = 안 함) → <code>kill -9</code>도 안 먹힘<br>
- KILLABLE: 절충, <code>SIGKILL</code> 같은 fatal signal에만 반응 ("Killable = kill만 OK")<br><br>
<b>④ STOPPED 시그널</b><br>
- 멈춤: SIGSTOP, SIGTSTP(Ctrl+Z), SIGTTIN, SIGTTOU → "STOP 계열 + TT 둘(터미널 입력/출력)"<br>
- 재개: SIGCONT(continue) / TRACED: 디버거(<code>ptrace()</code>, gdb)가 붙은 상태<br>
<small>※ PDF에는 SIGTTOU가 SIGTOUT으로 오타</small><br><br>
<b>⑤ ZOMBIE 한 줄</b><br>
자원은 반납했지만, 종료 사유·통계를 부모에게 전해주려고 남아 있다가 부모가 <code>wait()</code> 하면 사라진다.<br><br>
<small>서술형은 ②의 순서(fork → ready → running → …)대로 화살표를 따라가며 쓰면 빠뜨리지 않는다.</small>`;
