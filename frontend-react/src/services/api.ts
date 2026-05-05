const API_BASE_URL = 'http://localhost:8080/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: string
}

export interface User {
  userId: number
  name: string
  email: string
  role: string
  createdAt: string
}

export interface Institution {
  institutionId: number
  name: string
  location: string
  createdAt: string
}

export interface Program {
  programId: number
  institutionId: number
  programName: string
  createdAt: string
}

export interface Course {
  courseId: number
  institutionId: number
  programId: number
  courseName: string
  courseCode: string
  credits: number
  skillEarned?: string
  createdAt: string
}

export interface KnowledgeUnit {
  kuId: number
  kuName: string
  kuDescription: string
  createdAt: string
}

export interface MatchRequest {
  courseIdFrom: number
  courseIdTo: number
}

// Custom request options that extends RequestInit with our custom properties
interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

// API service class
class ApiService {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add basic auth for endpoints that require it
    if (options.requiresAuth) {
      const credentials = btoa('admin:secret') // You might want to make this dynamic
      config.headers = {
        ...config.headers,
        'Authorization': `Basic ${credentials}`
      }
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<User> {
    return this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      requiresAuth: false
    })
  }

  async register(userData: RegisterRequest): Promise<User> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      requiresAuth: false
    })
  }

  // Institutions
  async getInstitutions(): Promise<Institution[]> {
    return this.request<Institution[]>('/institutions')
  }

  async getInstitution(id: number): Promise<Institution> {
    return this.request<Institution>(`/institutions/${id}`)
  }

  // Programs
  async getPrograms(): Promise<Program[]> {
    return this.request<Program[]>('/programs')
  }

  async getProgram(id: number): Promise<Program> {
    return this.request<Program>(`/programs/${id}`)
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>('/courses')
  }

  async getCourse(id: number): Promise<Course> {
    return this.request<Course>(`/courses/${id}`)
  }

  // Knowledge Units
  async getKnowledgeUnits(): Promise<KnowledgeUnit[]> {
    return this.request<KnowledgeUnit[]>('/knowledge_units')
  }

  // Course Matching
  async calculateMatch(matchRequest: MatchRequest): Promise<string> {
    return this.request<string>('/match', {
      method: 'POST',
      body: JSON.stringify(matchRequest),
      requiresAuth: true
    })
  }

  async getFullyMatchedCourses(): Promise<any[]> {
    return this.request<any[]>('/match/fully-matched', {
      requiresAuth: true
    })
  }

  async getMissingCourses(): Promise<any[]> {
    return this.request<any[]>('/match/missing-courses', {
      requiresAuth: true
    })
  }

  async getMissingCoursesPercent(): Promise<any> {
    return this.request<any>('/match/missing-courses-percent', {
      requiresAuth: true
    })
  }

  async getErroredCourses(): Promise<any[]> {
    return this.request<any[]>('/match/errored-courses', {
      requiresAuth: true
    })
  }

  // Users (admin only)
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users', {
      requiresAuth: true
    })
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      requiresAuth: true
    })
  }
}

export const apiService = new ApiService()
export default apiService
